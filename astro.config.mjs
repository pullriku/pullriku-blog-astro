// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
// @ts-ignore
import rehypeFigure from "rehype-figure";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkCodeTiles from "remark-flexible-code-titles";
// @ts-ignore
import remarkLinkCard from "remark-link-card";

import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

import icon from "astro-icon";

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
      icon(),
    ],
    markdown: {
        remarkPlugins: [
            remarkCodeTiles,
            remarkBreaks,
            [
                remarkLinkCard,
                // { shortenUrl: true },
                { cache: false, shortenUrl: true },
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