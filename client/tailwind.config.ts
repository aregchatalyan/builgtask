import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#F8F9FA',
        'color-2': '#E1EFFE',
        'color-3': '#A4CAFE',
        'color-4': '#4B5563',
        'color-5': '#1C64F2',
        'color-6': '#111928'
      },
      gap: {
        '4.5': '18px'
      }
    },
    screens: {
      'lg': { min: '1440px' },
      'md': { max: '1023px' },
      'sm': { max: '768px' }
    }
  },
  plugins: []
}

export default config;
