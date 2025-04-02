const config = {
    plugins: {
        "@tailwindcss/postcss": {},
    },
    theme: {
        extend:
        {
            fontFamily: {
                alex: ["var(--font-alex-brush)"]
            }
        }
    }
};

export default config;
