/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'guinea-red': '#CE1126',
        'guinea-yellow': '#FCD116',
        'guinea-green': '#009460',
        'earth-black': '#333333',
        'soft-paper': '#FFF5F6',
        'terracotta': '#E2725B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'african-pattern': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40c0-22.09 17.91-40 40-40v80c-22.09 0-40-17.91-40-40zM0 0c22.09 0 40 17.91 40 40S22.09 80 0 80V0z' fill='%23CE1126' fill-opacity='0.008' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: [],
}