/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '200% 0',
          },
          '50%': {
            'background-position': '0% 0',
          },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 3s linear infinite',
      },
    },
  },
  plugins: [],
} 