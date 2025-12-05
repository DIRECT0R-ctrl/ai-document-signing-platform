import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/connfig/ ; afteer this the resut is cacched ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
