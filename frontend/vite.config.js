import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/cofig/ ; afte this the rsult is cached ; kept simple for now
export default defineConfig({
  plugins: [react()],
})
