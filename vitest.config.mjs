import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      '@admin/components': resolve(__dirname, 'src/app/(admin)/admin/_components'),
      '@admin': resolve(__dirname, 'src/app/(admin)/admin'),
      '@components': resolve(__dirname, 'src/app/_components'),
      '@config': resolve(__dirname, 'src/app/config'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});
