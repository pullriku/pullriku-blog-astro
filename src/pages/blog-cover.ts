import { defaultOgpImageBuffer } from "@lib/ogpImage";
import type { APIContext } from "astro";

export async function GET(_context: APIContext): Promise<Response> {
    const defaultOgpImage = await defaultOgpImageBuffer();
    return new Response(defaultOgpImage, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}
