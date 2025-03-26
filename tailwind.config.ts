import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'success-circle': {
          '0%': {
            'stroke-dasharray': '166',
            'stroke-dashoffset': '166',
            'stroke-width': '2',
            'stroke': 'white',
            'fill': 'none',
          },
          '100%': {
            'stroke-dasharray': '166',
            'stroke-dashoffset': '0',
            'stroke-width': '2',
            'stroke': 'white',
            'fill': 'none',
          },
        },
        'success-check': {
          '0%': {
            'stroke-dashoffset': '48',
          },
          '100%': {
            'stroke-dashoffset': '0',
          },
        },
        'success-fill': {
          '100%': {
            'background-color': '#4CAF50',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        gradient: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'loading-shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'loading-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'loading-dots': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        },
        'loading-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'success-circle': 'success-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        'success-check': 'success-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
        'success-fill': 'success-fill 0.4s ease-in-out 0.4s forwards',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 3s linear infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-up': 'scale-up 0.2s ease-out',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'loading-shine': 'loading-shine 2.5s linear infinite',
        'loading-pulse': 'loading-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'loading-dots': 'loading-dots 2s infinite',
        'loading-spin': 'loading-spin 1s linear infinite'
      },
      backgroundImage: {
        'loading-gradient': 'linear-gradient(90deg, transparent 0%, var(--loading-shine) 50%, transparent 100%)',
        'loading-dots-gradient': 'linear-gradient(90deg, var(--dots-color) 0%, var(--dots-color) 50%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
