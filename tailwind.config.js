/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"] ,
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        accent: '#8b5cf6',
        bg: '#0b1020'
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
