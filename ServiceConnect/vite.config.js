import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
    // Proxy API calls to the mock backend during development to avoid CORS/404
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.MOCK_PORT || 4000}`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
});
