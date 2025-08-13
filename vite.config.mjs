import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#types': path.resolve(__dirname, './src/@types/types.d.ts')
    },
  },
  test: {
    globals: true,
    environment: "./prisma/vitest-environment-prisma.ts"
  },
})