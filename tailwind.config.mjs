/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                void: '#050505',
                'terminal-green': '#00FF41',
                'terminal-amber': '#FFB000',
                'terminal-red': '#FF3E3E',
                'slate-tactical': '#1A1A1A',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                ocr: ['OCR-A', 'monospace'],
            },
        },
    },
    plugins: [],
};
