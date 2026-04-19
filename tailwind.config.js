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
        // Guinea flag
        'guinea-red':      '#BE0000',
        'guinea-red-dark': '#9B0000',
        'guinea-yellow':   '#FFCC00',
        'guinea-green':    '#00843D',
        // Neutral base
        'ivory':           '#FAFAF8',
        'ink':             '#0F0F0F',
        // Semantic
        'ink-muted':       '#6B6B6B',
        'border-subtle':   '#E8E8E6',
      },
      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'caption': ['9px',  { lineHeight: '1.4', letterSpacing: '0.06em' }],
        'label':   ['10px', { lineHeight: '1.4', letterSpacing: '0.28em' }],
        'badge':   ['11px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        'body-sm': ['13px', { lineHeight: '1.6' }],
        'body-lg': ['17px', { lineHeight: '1.75' }],
      },
      boxShadow: {
        'soft-elegant': '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)',
        'soft-sm':      '0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)',
        'soft-lg':      '0 8px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'soft-xl':      '0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        'token':    '8px',
        'token-lg': '12px',
        'token-xl': '20px',
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
