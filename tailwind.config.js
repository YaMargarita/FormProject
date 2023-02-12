module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          '0%': {opacity: '0%'},
          '100%': {opacity: '100%'}
        }
      },
      animation: {
        "fade-in": 'fade-in 0.3s ease-in-out'
      }
    },
  },
  plugins: [],
}
