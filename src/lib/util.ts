import { type CollectionEntry, getCollection, getEntry } from "astro:content";

/**
 * すべての公開の投稿を取得する。
 * 開発モードのときは非公開の投稿も取得する。
 *
 * @returns 投稿の配列
 */
export async function getAllPosts(): Promise<CollectionEntry<"posts">[]> {
    const result = (await getCollection("posts")).filter((post) => {
        return (post.data.pub ?? false) || import.meta.env.DEV;
    });

    return result;
}

export async function getAllPostsWithHero(): Promise<{
    hero: CollectionEntry<"posts">;
    others: CollectionEntry<"posts">[];
}> {
    const allPosts = (await getAllPosts()).sort((a, b) => {
        return b.data.pubDate.getTime() - a.data.pubDate.getTime();
    });

    if (allPosts.length >= 2) {
        return {
            hero: allPosts.slice(0)[0],
            others: allPosts.slice(1, allPosts.length),
        };
    }
    if (allPosts.length === 1) {
        return {
            hero: allPosts[0],
            others: [],
        };
    }
    throw new Error("No posts found");
}

export async function getPostBySlug(slug: string) {
    return await getEntry("posts", slug);
}

export function getTagsFromPost(post: CollectionEntry<"posts">): Set<string> {
    const tags = post.data.tags ?? [];
    return new Set(tags);
}

export async function getPostsByTag(tag: string) {
    const posts = await getAllPosts();
    return posts.filter((post) => post.data.tags?.includes(tag));
}

export type TagInfo = {
    tag: string;
    count: number;
};

export async function getTags(): Promise<TagInfo[]> {
    const posts = await getAllPosts();
    const tagCount: Record<string, number> = {};
    for (const post of posts) {
        const tags = getTagsFromPost(post);
        for (const tag of tags ?? new Set()) {
            const count = tagCount[tag] ?? 0;
            tagCount[tag] = count + 1;
        }
    }
    return Object.entries(tagCount).map(([tag, count]) => ({
        tag,
        count,
    }));
}

export function getPostUrl(slug: string): string {
    return `/posts/${slug}/`;
}
