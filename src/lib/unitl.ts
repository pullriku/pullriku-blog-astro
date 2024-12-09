import { glob } from "astro/loaders";
import { getCollection, getEntry } from "astro:content";

export async function getAllPosts() {
    return (await getCollection("posts")).filter((post) => post.data.pub ?? true);
}

export async function getAllPostsWithHero() {
    const allPosts = (await getAllPosts()).sort((a, b) => {
        return b.data.pubDate.getTime() - a.data.pubDate.getTime();
    });

    if (allPosts.length >= 2) {
        return {
            hero: allPosts.slice(0)[0],
            others: allPosts.slice(1, allPosts.length),
        }
    } else if (allPosts.length === 1) {
        return {
            hero: allPosts[0],
            others: [],
        }
    } else {
        throw new Error("No posts found");
    }
}

export async function getPostBySlug(slug: string) {
    return await getEntry("posts", slug);
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
        for (const tag of post.data.tags ?? []) {
            const count = tagCount[tag] ?? 0;
            tagCount[tag] = count + 1;
        }
    }
    return Object.entries(tagCount).map(([tag, count]) => ({
        tag,
        count,
    }));
}
