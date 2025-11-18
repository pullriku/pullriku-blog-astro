import { defaultOgpImageBuffer } from "@lib/ogpImage";
import type { APIContext } from "astro";

export async function GET(_context: APIContext): Promise<Response> {
    const defaultOgpImage: Buffer = await defaultOgpImageBuffer();
    return new Response(new Uint8Array(defaultOgpImage), {
        headers: {
            "Content-Type": "image/png",
        },
    });
}
