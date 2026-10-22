import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5178,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3002'
    }
  },
  preview: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3002'
    }
  },
  plugins: [react()],
})
