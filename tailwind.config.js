/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Dark Wood Brown
                wood: {
                    900: '#3E2723',
                    800: '#4E342E',
                    700: '#5D4037',
                    600: '#6D4C41',
                    500: '#795548',
                },
                // Beige
                beige: {
                    100: '#FAF8F5',
                    200: '#F5F5DC',
                    300: '#EFEBE9',
                    400: '#D7CCC8',
                    500: '#BCAAA4',
                },
                // Matte Black
                matte: {
                    900: '#0D0D0D',
                    800: '#1A1A1A',
                    700: '#262626',
                    600: '#333333',
                    500: '#404040',
                },
                // Gold Accent
                gold: {
                    light: '#F5E6B3',
                    DEFAULT: '#D4AF37',
                    dark: '#B8860B',
                    muted: '#C4A35A',
                }
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'slide-down': 'slideDown 0.3s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gold-shimmer': 'linear-gradient(90deg, #D4AF37, #F5E6B3, #D4AF37)',
            },
        },
    },
    plugins: [],
}
