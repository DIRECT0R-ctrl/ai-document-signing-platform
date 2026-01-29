import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/cnfig/ ; after this the result is cacched ; kept smple for now
export default defineConfig({
  plugins: [react()],
})
