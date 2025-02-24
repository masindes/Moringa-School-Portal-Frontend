/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'], 
        poppins: ['Poppins', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        darkBg: "#1E293B", // Custom dark background (Slate-800)
        darkText: "#CBD5E1", // Light gray text for readability
        darkAccent: "#ff7d00", // Accent color for buttons in dark mode
      },
      gridTemplateColumns: {
        "70/30" : "70% 28%"
      }
    },
  },
  plugins: [],
}
