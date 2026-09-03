import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141414',
        paper: '#edeae2',
        card: '#f7f5f0',
        grey: '#8a8a8a',
        lite: '#cdcbc3',
      },
      fontFamily: {
        mono: ['"Courier New"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        pix: '3px 3px 0 0 #141414',
        pixsm: '2px 2px 0 0 #141414',
      },
    },
  },
  plugins: [],
};
export default config;
