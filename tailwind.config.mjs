/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx}'],
    darkMode: ['selector', '[data-mode="dark"]'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {},
    },
    plugins: [],
};
