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
        // Guinea flag — deeper, more premium tones
        'guinea-red':    '#BE0000',
        'guinea-yellow': '#FFCC00',
        'guinea-green':  '#00843D',
        // Neutral base
        'ivory':         '#FAFAF8',
        'ink':           '#0F0F0F',
        'earth-black':   '#1C1C1E',
        'soft-paper':    '#FAFAF8',
        // Legacy aliases (keep for backward compat during migration)
        'terracotta':    '#C9614A',
      },
      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft-elegant': '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)',
        'soft-sm':      '0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)',
        'soft-lg':      '0 8px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'soft-xl':      '0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        'token':  '8px',
        'token-lg': '12px',
        'token-xl': '20px',
      },
      backgroundImage: {
        // Ultra-subtle geometric — kept for selective use
        'african-pattern': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40c0-22.09 17.91-40 40-40v80c-22.09 0-40-17.91-40-40zM0 0c22.09 0 40 17.91 40 40S22.09 80 0 80V0z' fill='%23BE0000' fill-opacity='0.006' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.35s ease-out forwards',
      },
    }
  },
  plugins: [require('tailwindcss-animate')],
}
