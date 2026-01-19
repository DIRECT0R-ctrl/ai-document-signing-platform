import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/ ; after this the resut is cacched ; kept smple for now
export default defineConfig({
  plugins: [react()],
})
