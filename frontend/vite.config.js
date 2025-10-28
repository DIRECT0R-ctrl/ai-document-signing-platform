import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/connfig/ ; after this the result is cached
export default defineConfig({
  plugins: [react()],
})
