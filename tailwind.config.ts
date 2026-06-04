import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#081A0C',
        'luxury-surface': '#0C2214',
        'luxury-gold': '#C9A227',
        'luxury-gold-light': '#DDB84A',
        'luxury-cream': '#F0ECD8',
      },
      fontFamily: {
        instrument: ['"Instrument Serif"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        emberFloat: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-60px) translateX(10px) scale(0.7)', opacity: '0.5' },
          '100%': { transform: 'translateY(-120px) translateX(-5px) scale(0.2)', opacity: '0' },
        },
        firePulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineExpand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'ember-float': 'emberFloat 4s ease-out infinite',
        'fire-pulse': 'firePulse 3s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'line-expand': 'lineExpand 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
