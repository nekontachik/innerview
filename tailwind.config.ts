import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gray: {
          50: 'hsl(var(--gray-50))',
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
          600: 'hsl(var(--gray-600))',
          700: 'hsl(var(--gray-700))',
          800: 'hsl(var(--gray-800))',
          900: 'hsl(var(--gray-900))',
        },
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          700: 'hsl(var(--blue-700))',
          800: 'hsl(var(--blue-800))',
          900: 'hsl(var(--blue-900))',
        },
        pink: {
          50: 'hsl(var(--pink-50))',
          100: 'hsl(var(--pink-100))',
          200: 'hsl(var(--pink-200))',
          300: 'hsl(var(--pink-300))',
          400: 'hsl(var(--pink-400))',
          500: 'hsl(var(--pink-500))',
          600: 'hsl(var(--pink-600))',
          700: 'hsl(var(--pink-700))',
          800: 'hsl(var(--pink-800))',
          900: 'hsl(var(--pink-900))',
        },
        purple: {
          50: 'hsl(var(--purple-50))',
          100: 'hsl(var(--purple-100))',
          200: 'hsl(var(--purple-200))',
          300: 'hsl(var(--purple-300))',
          400: 'hsl(var(--purple-400))',
          500: 'hsl(var(--purple-500))',
          600: 'hsl(var(--purple-600))',
          700: 'hsl(var(--purple-700))',
          800: 'hsl(var(--purple-800))',
          900: 'hsl(var(--purple-900))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 