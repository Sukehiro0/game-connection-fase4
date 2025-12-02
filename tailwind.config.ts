import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1DE56D',
          hover: '#00ff66',
          dark: '#02011E',
          surface: '#0A092D',
          input: '#39FF74',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #0A092D, #04041b)',
      },
    },
  },
  plugins: [],
};
export default config;