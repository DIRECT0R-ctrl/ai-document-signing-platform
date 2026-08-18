import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/confiig/ ; afte this the rsul is cached ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
