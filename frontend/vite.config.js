import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/ ; afte this the rsul is cahed ; kept sipmle for now
export default defineConfig({
  plugins: [react()],
})
