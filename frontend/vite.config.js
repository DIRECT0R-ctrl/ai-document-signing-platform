import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/confi/ ; afte this the rsul is cahhed ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
