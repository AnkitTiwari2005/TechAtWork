/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffafd6',
        'primary-container': '#e38cb8',
        'on-primary': '#57173e',
        background: '#131313',
        surface: '#1b1b1b',
        'surface-glass': 'rgba(53,53,53,0.5)',
        'outline-variant': '#514349',
        'on-surface-variant': '#d6c1c9',
        'on-surface': '#e2e2e2',
        'accent-green': '#becc9a',
        'whatsapp': '#25D366',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee-forward 20s linear infinite',
        'marquee-reverse': 'marquee-reverse 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up': 'count-up 2s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      screens: {
        xs: '360px',
        sm: '390px',
        md: '428px',
      },
      keyframes: {
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255,175,214,0.4), 0 0 60px rgba(255,175,214,0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255,175,214,0.8), 0 0 120px rgba(255,175,214,0.4)' 
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
