/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'], 
        poppins: ['Poppins', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      gridTemplateColumns: {
        "70/30" : "70% 28%"
      }
    },
  },
  plugins: [],
}
