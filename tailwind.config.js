/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    DEFAULT: '#6366F1', // Indigo
                    light: '#A5B4FC',
                    dark: '#4338CA',
                },
            },
            boxShadow: {
                glow: '0 0 20px rgba(99, 102, 241, 0.4)',
            },
        },
    },
    plugins: [],
}
