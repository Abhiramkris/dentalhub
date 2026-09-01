/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./privacy.html",
    "./terms.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0c2340',
          blue: '#1da3c8',
          blueDark: '#127b99',
          blueLight: '#e0f4fa',
          cyan: '#32bceb',
          sand: '#f0f7ff',
          almond: '#e2e8f0',
          beige: '#f8fafc',
          dark: '#0f172a',
          accent: '#1da3c8',
          muted: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
