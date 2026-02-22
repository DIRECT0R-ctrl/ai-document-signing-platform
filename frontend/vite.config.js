import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/cnfig/ ; afte this the result is cached ; kept smple for now
export default defineConfig({
  plugins: [react()],
})
