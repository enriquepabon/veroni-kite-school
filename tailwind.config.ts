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
        // Veroni Kite — Brand Guidelines Official Palette
        'ocean-teal': {
          DEFAULT: '#2A9D8F', // Primary brand color
          50: '#E8F5F3',
          100: '#D1EBE7',
          200: '#A3D7CF',
          300: '#76C3B7',
          400: '#48AF9F',
          500: '#2A9D8F',
          600: '#227E72',
          700: '#1A5E56',
          800: '#113F39',
          900: '#091F1D',
        },
        'deep-marine': {
          DEFAULT: '#264653', // Primary dark
          50: '#E9ECEE',
          100: '#D3D9DC',
          200: '#A7B3B9',
          300: '#7B8D96',
          400: '#4F6773',
          500: '#264653',
          600: '#1E3842',
          700: '#172A32',
          800: '#0F1C21',
          900: '#080E11',
        },
        'caribbean-aqua': {
          DEFAULT: '#76C7C0', // Light accent
          50: '#EFF9F8',
          100: '#DFF3F1',
          200: '#BFE7E3',
          300: '#9FDBD5',
          400: '#7FCFC7',
          500: '#76C7C0',
          600: '#5E9F9A',
          700: '#477773',
          800: '#2F504D',
          900: '#182826',
        },
        'sand-gold': {
          DEFAULT: '#E9C46A', // Secondary accent (CTA, highlights)
          50: '#FCF8ED',
          100: '#F9F1DB',
          200: '#F3E3B7',
          300: '#EDD593',
          400: '#E7C76F',
          500: '#E9C46A',
          600: '#BA9D55',
          700: '#8C7640',
          800: '#5D4E2A',
          900: '#2F2715',
        },
        'salt-white': {
          DEFAULT: '#FAFDF6', // Primary light background
          50: '#FAFDF6',
          100: '#F5FBF0',
          200: '#EBF7E1',
          300: '#E1F3D2',
          400: '#D7EFC3',
          500: '#FAFDF6',
          600: '#C8CAC5',
          700: '#969894',
          800: '#646562',
          900: '#323331',
        },
        'night-tide': {
          DEFAULT: '#1A1A2E', // Primary black/dark text
          50: '#E6E6E9',
          100: '#CDCDD3',
          200: '#9B9BA7',
          300: '#69697B',
          400: '#37374F',
          500: '#1A1A2E',
          600: '#151525',
          700: '#10101C',
          800: '#0B0B13',
          900: '#050509',
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-caveat)", "cursive"],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #2A9D8F 0%, #76C7C0 100%)', // Ocean Teal → Caribbean Aqua
        'gradient-ocean': 'linear-gradient(135deg, #264653 0%, #2A9D8F 100%)', // Deep Marine → Ocean Teal
        'gradient-sunset': 'linear-gradient(135deg, #E9C46A 0%, #76C7C0 100%)', // Sand Gold → Caribbean Aqua
        'gradient-dark': 'linear-gradient(180deg, #264653 0%, #1A1A2E 100%)', // Deep Marine → Night Tide
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      borderRadius: {
        'card': '16px', // Brand Guidelines: formas orgánicas redondeadas para tarjetas
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-ocean-teal': '0 0 20px rgba(42, 157, 143, 0.3)', // Ocean Teal
        'glow-sand-gold': '0 0 20px rgba(233, 196, 106, 0.3)', // Sand Gold
        'card': '0 4px 24px rgba(26, 26, 46, 0.08)', // Night Tide
        'card-hover': '0 8px 40px rgba(26, 26, 46, 0.16)',
        'glass': '0 8px 32px rgba(38, 70, 83, 0.12)', // Deep Marine
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 170, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 212, 170, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
