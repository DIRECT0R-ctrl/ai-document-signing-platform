import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/connfig/ ; after this the result is cached
export default defineConfig({
  plugins: [react()],
})
