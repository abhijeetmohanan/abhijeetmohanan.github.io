/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Fira Code', 'monospace'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
