// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

import remarkCodeTiles from "remark-flexible-code-titles";

import remarkBreaks from 'remark-breaks';

// https://astro.build/config
export default defineConfig({
  vite: {
        optimizeDeps: {
            exclude: []
        }
    },
  integrations: [tailwind(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkCodeTiles,
      remarkBreaks,
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackContent: "↩",
      footnoteLabelTagName: "hr",
    }
  }
});
