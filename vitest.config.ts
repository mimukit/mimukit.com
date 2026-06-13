import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // neon.ts builds its client at module load; supply a dummy URL so importing
    // feedback.ts succeeds. No real connection is made — the pure helpers never query.
    env: {
      NEON_DATABASE_URL: 'postgresql://user:pass@localhost/db',
    },
  },
});
