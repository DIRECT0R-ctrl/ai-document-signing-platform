import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/conifg/ ; afte this the reesul is cachedd ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
