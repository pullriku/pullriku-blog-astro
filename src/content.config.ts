import { defineCollection, z } from "astro:content";
import type { Document } from "@lib/types";
import { glob } from "astro/loaders";

const postsSchema = z
    .object({
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
        /** 公開するかどうか */
        pub: z.boolean().optional(),
        /**
         * Zenn の記事であるかどうか
         * 指定すると、記事の中身は無視され、Zennにリンクされる
         */
        zenn: z.boolean().optional(),
        /** 記事の連載名 */
        series: z.string().optional(),
        /** 記事の連載のパート番号 */
        part: z.number().int().optional(),
    })
    .superRefine((data, ctx) => {
        // seriesが指定されている場合、partも指定されていることを確認
        if (data.series !== undefined && data.part === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "If 'series' is specified, 'part' must also be specified.",
            });
        }
    }) satisfies z.ZodType<Document>;

/**
 * マークダウンのFrontmatterに対応する型定義
 */
const posts = defineCollection({
    loader: glob({
        pattern: "**/*.(md|mdx)",
        base: "./src/contents/posts",
        generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
    }),
    schema: postsSchema,
});

const seriesSchema = z.object({
    desc: z.string(),
});

const series = defineCollection({
    loader: glob({
        pattern: "**/*.toml",
        base: "./src/contents/series",
        generateId: ({ entry }) => entry.replace(/\.toml$/, ""),
    }),
    schema: seriesSchema,
});

const docsSchema = z.object({
    /** ドキュメントのタイトル */
    title: z.string(),
    /** ドキュメントの説明 */
    desc: z.string(),
    /** 公開日 */
    pubDate: z.date(),
    /** 更新日 */
    updatedDate: z.date().optional(),
}) satisfies z.ZodType<Document>;
const docs = defineCollection({
    loader: glob({
        pattern: "**/*.(md|mdx)",
        base: "src/contents/docs",
        generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
    }),
    schema: docsSchema,
});

export const collections = { posts, docs, series };
