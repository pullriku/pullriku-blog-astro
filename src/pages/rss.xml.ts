import rss from "@astrojs/rss";
import { BLOG_NAME } from "@lib/consts";
import { getAllPosts, getPostUrl } from "@lib/post";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const posts = await getAllPosts();
    return rss({
        title: BLOG_NAME,
        description:
            "@pullrikuによる技術ブログです。他サービスに投稿した記事もまとめています。",
        site: context.site ?? "",
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.desc,
            pubDate: post.data.pubDate,
            link: getPostUrl(post.id),
        })),
        customData: "<language>ja</language>",
    });
}
