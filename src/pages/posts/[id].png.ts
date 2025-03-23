import { ogImageWithTitle } from "@lib/ogpImage";
import { getAllPosts, getPostBySlug } from "@lib/util";
import type { APIContext } from "astro";

export const getStaticPaths = async () => {
    const articles = await getAllPosts();

    if (!articles || articles.length <= 0) return;

    return articles.map((article) => ({
        params: { id: article.id },
    }));
};

export const GET = async ({ params }: APIContext) => {
    if (!params.id) {
        return;
    }
    const article = await getPostBySlug(params.id);

    if (!article?.data.title) {
        return;
    }

    const ogImage = await ogImageWithTitle(article.data.title);

    return new Response(ogImage, {
        headers: {
            "Content-Type": "image/png",
        },
    });
};
