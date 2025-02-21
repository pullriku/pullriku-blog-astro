import { getAllPosts, getPostBySlug } from "../../lib/util";
import { ogImageWithTitle } from "../../components/OgImage";
import type { APIContext } from "astro";

export const getStaticPaths = async () => {
    const articles = await getAllPosts();

    if (!articles || articles.length <= 0) return;

    return articles.map((article) => ({
        params: { slug: article.slug },
    }));
};

export const GET = async ({ params }: APIContext) => {
    if (!params.slug) {
        return;
    }
    const article = await getPostBySlug(params.slug);

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
