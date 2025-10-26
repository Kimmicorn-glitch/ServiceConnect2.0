/**
 * ServiceConnect Backend API
 * Cloudflare Worker with D1 Database
 */

interface Env {
  DB: D1Database;
}

// Admin encrypted YWID (project creator)
const ADMIN_ENCRYPTED_YWID = '5Wi2qwGwzL3T2SkcUm9PlcaHwp9Hyn6GUwa9n2jt6nOe2Wv_zLqrqMmA_5WnNP1G38VjfA';

// CORS headers for API responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-Id, X-Encrypted-Yw-ID, X-Is-Login',
};

// Helper function to create JSON response with CORS
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Helper function to get or create user
async function getOrCreateUser(db: D1Database, encryptedYwId: string, displayName?: string, photoUrl?: string) {
  // Try to get existing user
  const stmt = db.prepare('SELECT * FROM users WHERE encrypted_yw_id = ?');
  const { results } = await stmt.bind(encryptedYwId).all();
  
  if (results.length > 0) {
    // Update user info if provided
    if (displayName || photoUrl) {
      const updateStmt = db.prepare(
        'UPDATE users SET display_name = ?, photo_url = ?, updated_at = datetime("now") WHERE encrypted_yw_id = ?'
      );
      await updateStmt.bind(displayName || null, photoUrl || null, encryptedYwId).run();
    }
    return results[0];
  }
  
  // Create new user
  const insertStmt = db.prepare(
    'INSERT INTO users (encrypted_yw_id, display_name, photo_url) VALUES (?, ?, ?)'
  );
  const result = await insertStmt.bind(encryptedYwId, displayName || null, photoUrl || null).run();
  
  // Return the newly created user
  const newUserStmt = db.prepare('SELECT * FROM users WHERE id = ?');
  const { results: newUser } = await newUserStmt.bind(result.meta.last_row_id).all();
  return newUser[0];
}

// Main worker handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Extract user info from headers
    const encryptedYwId = request.headers.get('X-Encrypted-Yw-ID');
    const isLogin = request.headers.get('X-Is-Login') === '1';
    
    try {
      // ============ AUTH ENDPOINTS ============
      
      // Check admin status
      if (url.pathname === '/api/auth/is-admin') {
        const isAdmin = encryptedYwId === ADMIN_ENCRYPTED_YWID;
        return jsonResponse({ isAdmin });
      }
      
      // Get current user info
      if (url.pathname === '/api/auth/me') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        return jsonResponse({ user, isLogin });
      }
      
      // Update user profile
      if (url.pathname === '/api/auth/update-profile' && request.method === 'POST') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const { displayName, photoUrl, email, phone } = await request.json() as any;
        
        const stmt = env.DB.prepare(
          'UPDATE users SET display_name = ?, photo_url = ?, email = ?, phone = ?, updated_at = datetime("now") WHERE encrypted_yw_id = ?'
        );
        await stmt.bind(displayName || null, photoUrl || null, email || null, phone || null, encryptedYwId).run();
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        return jsonResponse({ user });
      }
      
      // ============ PROVIDER ENDPOINTS ============
      
      // Get all providers
      if (url.pathname === '/api/providers' && request.method === 'GET') {
        const city = url.searchParams.get('city');
        const verified = url.searchParams.get('verified');
        
        let query = 'SELECT * FROM providers WHERE 1=1';
        const params: any[] = [];
        
        if (city) {
          query += ' AND city = ?';
          params.push(city);
        }
        
        if (verified) {
          query += ' AND verified = ?';
          params.push(verified === 'true' ? 1 : 0);
        }
        
        query += ' ORDER BY rating_average DESC, created_at DESC';
        
        const stmt = env.DB.prepare(query);
        const { results } = await stmt.bind(...params).all();
        
        return jsonResponse({ providers: results });
      }
      
      // Get provider by ID
      if (url.pathname.match(/^\/api\/providers\/\d+$/) && request.method === 'GET') {
        const providerId = url.pathname.split('/').pop();
        
        const stmt = env.DB.prepare('SELECT * FROM providers WHERE id = ?');
        const { results } = await stmt.bind(providerId).all();
        
        if (results.length === 0) {
          return jsonResponse({ error: 'Provider not found' }, 404);
        }
        
        return jsonResponse({ provider: results[0] });
      }
      
      // Create provider application
      if (url.pathname === '/api/providers' && request.method === 'POST') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        const { businessName, description, city, address, phone, email } = await request.json() as any;
        
        const stmt = env.DB.prepare(
          'INSERT INTO providers (user_id, business_name, description, city, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        const result = await stmt.bind(
          user.id,
          businessName,
          description || null,
          city,
          address || null,
          phone,
          email || null
        ).run();
        
        return jsonResponse({ 
          success: true, 
          providerId: result.meta.last_row_id,
          message: 'Provider application submitted successfully'
        });
      }
      
      // ============ SERVICE ENDPOINTS ============
      
      // Get services
      if (url.pathname === '/api/services' && request.method === 'GET') {
        const category = url.searchParams.get('category');
        const providerId = url.searchParams.get('provider_id');
        
        let query = 'SELECT s.*, p.business_name, p.city, p.rating_average FROM services s JOIN providers p ON s.provider_id = p.id WHERE s.active = 1';
        const params: any[] = [];
        
        if (category) {
          query += ' AND s.category = ?';
          params.push(category);
        }
        
        if (providerId) {
          query += ' AND s.provider_id = ?';
          params.push(providerId);
        }
        
        query += ' ORDER BY s.created_at DESC';
        
        const stmt = env.DB.prepare(query);
        const { results } = await stmt.bind(...params).all();
        
        return jsonResponse({ services: results });
      }
      
      // ============ BOOKING ENDPOINTS ============
      
      // Get user bookings
      if (url.pathname === '/api/bookings' && request.method === 'GET') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        
        const stmt = env.DB.prepare(`
          SELECT b.*, p.business_name, s.name as service_name, s.category 
          FROM bookings b 
          JOIN providers p ON b.provider_id = p.id 
          JOIN services s ON b.service_id = s.id 
          WHERE b.user_id = ? 
          ORDER BY b.created_at DESC
        `);
        const { results } = await stmt.bind(user.id).all();
        
        return jsonResponse({ bookings: results });
      }
      
      // Create booking
      if (url.pathname === '/api/bookings' && request.method === 'POST') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        const { providerId, serviceId, scheduledDate, notes } = await request.json() as any;
        
        const stmt = env.DB.prepare(
          'INSERT INTO bookings (user_id, provider_id, service_id, scheduled_date, notes) VALUES (?, ?, ?, ?, ?)'
        );
        const result = await stmt.bind(
          user.id,
          providerId,
          serviceId,
          scheduledDate || null,
          notes || null
        ).run();
        
        return jsonResponse({ 
          success: true, 
          bookingId: result.meta.last_row_id,
          message: 'Booking created successfully'
        });
      }
      
      // ============ REVIEW ENDPOINTS ============
      
      // Get reviews for provider
      if (url.pathname.match(/^\/api\/reviews\/provider\/\d+$/) && request.method === 'GET') {
        const providerId = url.pathname.split('/').pop();
        
        const stmt = env.DB.prepare(`
          SELECT r.*, u.display_name, u.photo_url 
          FROM reviews r 
          JOIN users u ON r.user_id = u.id 
          WHERE r.provider_id = ? 
          ORDER BY r.created_at DESC
        `);
        const { results } = await stmt.bind(providerId).all();
        
        return jsonResponse({ reviews: results });
      }
      
      // Create review
      if (url.pathname === '/api/reviews' && request.method === 'POST') {
        if (!encryptedYwId) {
          return jsonResponse({ error: 'Not authenticated' }, 401);
        }
        
        const user = await getOrCreateUser(env.DB, encryptedYwId);
        const { bookingId, providerId, rating, comment } = await request.json() as any;
        
        // Insert review
        const insertStmt = env.DB.prepare(
          'INSERT INTO reviews (booking_id, user_id, provider_id, rating, comment) VALUES (?, ?, ?, ?, ?)'
        );
        await insertStmt.bind(bookingId, user.id, providerId, rating, comment || null).run();
        
        // Update provider rating
        const ratingStmt = env.DB.prepare(`
          UPDATE providers 
          SET rating_average = (SELECT AVG(rating) FROM reviews WHERE provider_id = ?),
              rating_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = ?),
              updated_at = datetime('now')
          WHERE id = ?
        `);
        await ratingStmt.bind(providerId, providerId, providerId).run();
        
        return jsonResponse({ 
          success: true,
          message: 'Review submitted successfully'
        });
      }
      
      // ============ ADMIN ENDPOINTS ============
      
      // Admin: Get all users
      if (url.pathname === '/api/admin/users' && request.method === 'GET') {
        if (encryptedYwId !== ADMIN_ENCRYPTED_YWID) {
          return jsonResponse({ error: 'Unauthorized' }, 403);
        }
        
        const stmt = env.DB.prepare('SELECT * FROM users ORDER BY created_at DESC');
        const { results } = await stmt.all();
        
        return jsonResponse({ users: results });
      }
      
      // Admin: Get all provider applications
      if (url.pathname === '/api/admin/providers' && request.method === 'GET') {
        if (encryptedYwId !== ADMIN_ENCRYPTED_YWID) {
          return jsonResponse({ error: 'Unauthorized' }, 403);
        }
        
        const stmt = env.DB.prepare('SELECT * FROM providers ORDER BY created_at DESC');
        const { results } = await stmt.all();
        
        return jsonResponse({ providers: results });
      }
      
      // Admin: Verify provider
      if (url.pathname === '/api/admin/providers/verify' && request.method === 'POST') {
        if (encryptedYwId !== ADMIN_ENCRYPTED_YWID) {
          return jsonResponse({ error: 'Unauthorized' }, 403);
        }
        
        const { providerId, verified } = await request.json() as any;
        
        const stmt = env.DB.prepare('UPDATE providers SET verified = ?, updated_at = datetime("now") WHERE id = ?');
        await stmt.bind(verified ? 1 : 0, providerId).run();
        
        return jsonResponse({ success: true, message: 'Provider verification updated' });
      }
      
      // Admin: Get platform stats
      if (url.pathname === '/api/admin/stats' && request.method === 'GET') {
        if (encryptedYwId !== ADMIN_ENCRYPTED_YWID) {
          return jsonResponse({ error: 'Unauthorized' }, 403);
        }
        
        const userCountStmt = env.DB.prepare('SELECT COUNT(*) as count FROM users');
        const providerCountStmt = env.DB.prepare('SELECT COUNT(*) as count FROM providers');
        const bookingCountStmt = env.DB.prepare('SELECT COUNT(*) as count FROM bookings');
        const reviewCountStmt = env.DB.prepare('SELECT COUNT(*) as count FROM reviews');
        
        const [userCount, providerCount, bookingCount, reviewCount] = await Promise.all([
          userCountStmt.first(),
          providerCountStmt.first(),
          bookingCountStmt.first(),
          reviewCountStmt.first(),
        ]);
        
        return jsonResponse({
          stats: {
            users: userCount?.count || 0,
            providers: providerCount?.count || 0,
            bookings: bookingCount?.count || 0,
            reviews: reviewCount?.count || 0,
          }
        });
      }
      
      // 404 Not Found
      return jsonResponse({ error: 'Endpoint not found' }, 404);
      
    } catch (error: any) {
      console.error('API Error:', error);
      return jsonResponse({ error: error.message || 'Internal server error' }, 500);
    }
  },
};
