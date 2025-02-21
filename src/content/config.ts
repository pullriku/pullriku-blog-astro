import { defineCollection, z } from "astro:content";

/**
 * マークダウンのFrontmatterに対応する型定義
 */
const postsCollection = defineCollection({
    type: "content",
    schema: z.object({
        /** 記事のタイトル */
        title: z.string(),
        /** 記事の説明 */
        desc: z.string(),
        /** 公開日 */
        pubDate: z.date(),
        /** 更新日 */
        updatedDate: z.date().optional(),
        /** タグの配列 */
        tags: z.array(z.string()).optional(),
        /** 記事を表すカバー画像のパス（指定しない場合は、slugから自動生成） */
        cover: z.string().optional(),
        /** 公開するかどうか */
        pub: z.boolean().optional(),
        /**
         * Zenn の記事であるかどうか
         * 指定すると、記事の中身は無視され、Zennにリンクされる
         */
        zenn: z.boolean().optional(),
    }),
});

export const collections = {
    posts: postsCollection,
};
