// Finalized placeholder type for D1Database
interface D1Database {
  prepare(query: string): {
    bind(...params: any[]): {
      all(): Promise<{ results: any[]; success: boolean }>,
      run(): Promise<{ meta: { last_row_id: number; changes: number } }>,
      first<T = any>(): Promise<T | null>
    }
  };
}