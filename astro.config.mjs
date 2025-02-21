// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import remarkCodeTiles from "remark-flexible-code-titles";
import remarkBreaks from "remark-breaks";
// @ts-ignore
import remarkLinkCard from "remark-link-card";
// @ts-ignore
import rehypeFigure from "rehype-figure";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";

import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
    site: "https://pullriku.net",
    base: "/",
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
        ssr: {
            external: ["@resvg/resvg-js"],
        },
        plugins: [tailwind()],
    },
    integrations: [
        mdx(),
        react(),
        partytown({ config: { forward: ["dataLayer.push"] } }),
    ],
    markdown: {
        remarkPlugins: [
            remarkCodeTiles,
            remarkBreaks,
            [
                remarkLinkCard,
                // { shortenUrl: true },
                { cache: true, shortenUrl: true },
            ],
        ],
        rehypePlugins: [
            rehypeRaw,
            [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
            ],
            rehypeFigure,
        ],
        remarkRehype: {
            footnoteLabel: "脚注",
            footnoteBackContent: "↩",
            footnoteLabelTagName: "hr",
        },
        shikiConfig: {
            // theme: "dark-plus",
        },
    },
});
