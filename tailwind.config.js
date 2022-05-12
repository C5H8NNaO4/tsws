const theme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        composite: 'transform, opacity',
      },
      zIndex: {
        negative: -1,
      },
      transitionDuration: {
        0: '0ms',
        5000: '5000ms',
      },
      colors: {
        primary: '#6246ea',
        links: '#6246ea',
        default: '#1a202c',
        unicorn: {
          default: '#1a202c',
          primary: '#6d28d9',
          secondary: '#F000B8',
          accent: '#e9d5ff',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
      // lila = #6246ea
      // headlines #1a202c
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // '--tw-docs-body': '#333',
            '--tw-docs-links': theme('colors.unicorn.links'),
            '--tw-links': '#6246ea',
            '--tw-docs-headings': theme('colors.default'),
            color: 'var(--tw-docs-body)',
            fontFamily: 'Inter',
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            h1: {
              fontWeight: '500',
              fontSize: '2.0rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: theme('colors.default'),
            },
            h2: {
              fontWeight: '500',
              fontSize: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: 'var(--tw-docs-headings)',
            },
            a: {
              color: '#6246ea',
              textDecoration: 'none',
              '&.active': {
                color: '#6246ea',
              },
              '&:hover': {
                color: '#2c4f7c',
              },
            },
          },
        },
      }),
      container: {
        center: true,
      },
      borderRadius: {
        '6xl': '3.5rem',
      },
      fontFamily: {
        display: ['Inter', ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    styled: true,
    themes: [
      {
        unicorn: {
          default: '#1a202c',
          primary: '#6246ea',
          links: '#6246ea',
          secondary: '#F000B8',
          accent: '#e9d5ff',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    darkTheme: 'unicorn',
    prefix: '',
  },
};
