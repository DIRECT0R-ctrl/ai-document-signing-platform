import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/connfig/ ; afteer this the result is cached
export default defineConfig({
  plugins: [react()],
})
