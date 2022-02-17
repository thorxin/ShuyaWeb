/** @format */

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '4rem',
        lg: '6rem',
        xl: '8rem',
        '2xl': '12rem',
      },
    },
    fontSize: {
      tiny: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.375rem',
      '2xl': '2.375rem',
      custom: '3rem',

      heading: '1.5rem',
      'sub-heading': '1.1rem',
      primary: '1rem',
      secondary: '0.875rem',
      caption: '0.75rem',
      'input-box': '0.875rem',
      'secondary-2xl': '1.25rem',
      'extra-small': '0.65rem',
    },

    textColor: {
      'color-default': '#000000',
      'color-primary': '#bc877e',
      'color-brown': '#bc877e',
      'color-secondary': '#95989e',
      'color-white': '#ffffff',
      'color-danger': '#ef4444',
      'color-link': '#1E90FF',
      'color-success': '#26CE28',
      'color-orange': '#e0222c',
      'color-yellow': '#ccc213',
      'color-main': '#feb4d7',
    },
    extend: {
      backgroundImage: (theme) => ({
        'language-mobile-image':
          "url('/src/assets/language/background_mobile.jpg')",
        'language-web-image': "url('/src/assets/Authentication/Common/bg.png')",
        'registration-mobile-image':
          "url('/src/assets/Authentication/Common/bg.png')",
        'registration-web-image':
          "url('/src/assets/Authentication/Common/bg.png')",
        'login-mobile-image': "url('/src/assets/Authentication/Common/bg.png')",
        'login-web-image': "url('/src/assets/Authentication/Common/bg.png')",
      }),
      colors: {
        'custom-secondary': '#f4f4f4',
        'custom-main': '#feb4d7',
        'custom-graycolor': '#f4f4f4',
        'custom-main-light': '#eedcce',
        'custom-red-light': '#c93827',
        'custom-primary': '#bc877e',
        'custom-primary-light': '#ef06d4',
        'custom-prmary-dark': '#3d064a',
        'custom-footer': '#6d542f',
        'custom-footer-link': '#4f391b',
        'custom-nav': '#fff8dc',
        'custom-search': '#6d542f',
        'custom-detail': '#4f391b',
        'custom-buyone': '#feed02',
        language: '#3d151d',
      },
      width: {
        'custom-noti-width-web': '500px',
        93: '23rem',
      },
      height: {
        'custom-noti-height-web': '430px',
      },
      maxHeight: {
        128: '30rem',
      },
      scale: {
        //
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
}
