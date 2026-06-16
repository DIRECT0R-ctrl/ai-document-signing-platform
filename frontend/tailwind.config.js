/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        auiCrimson: '#8B1D40',
        atlasLimestone: '#F7F4EF',
        cedarWood: '#3E2723',
        mintOasis: '#0D9488',
      }
    },
  },
  plugins: [],
}
