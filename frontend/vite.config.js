import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/confiig/ ; afte this the rsul is cahe ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
