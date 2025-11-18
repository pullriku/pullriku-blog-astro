/**
 * @see https://prettier.io/docs/configuration
 * @type { import("prettier").Config & import('prettier-plugin-tailwindcss').PluginOptions & import('prettier-plugin-astro').PluginOptions }
 */
const config = {
    tabWidth: 4,
    plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
    tailwindStylesheet: "./src/styles/global.css",
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};

export default config;
