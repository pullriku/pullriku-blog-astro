import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        pub: z.boolean().optional(),
        zenn: z.boolean().optional(),
    })
});

export const collections = {
    "posts": postsCollection,
};
