const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#1890ff',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
    },
    spacing: {
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      48: '48px',
    },
    width: {},
    height: {},
    fontSize: {
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
    },
    fontWeight: {
      400: 400,
      600: 600,
      700: 700,
    },
    borderRadius: {
      DEFAULT: '4px',
      8: '8px',
      12: '12px',
      24: '24px',
      48: '48px',
    },
  },
};
