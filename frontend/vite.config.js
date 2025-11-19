import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/cnfiig/ ; afte this the rsul is cahe ; kept siimple for now
export default defineConfig({
  plugins: [react()],
})
