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
        'primary-gray': '#EDEDE9',
        'secundary-gray': '#a1a0a0',
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
};
export default config;
