import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "media",
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        "h1, h2, h3, h4, h5, h6": {
                            "@apply border-b-4 leading-relaxed": "",
                        },
                        code: {
                            "@apply bg-slate-200 dark:bg-slate-700 p-4 rounded-md":
                                "",
                        },
                        "code::before": {
                            content: "none",
                        },
                        "code::after": {
                            content: "none",
                        },
                    },
                },
            },
        },
    },
    plugins: [typography],
};
