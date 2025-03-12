import type { APIContext } from "astro";
import DefaultOgpImage from "../components/DefaultOgpImage";

export async function GET(context: APIContext): Promise<Response> {
    const defaultOgpImage = await DefaultOgpImage();
    return new Response(defaultOgpImage, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}
