import { loadEnv } from "vite";

// Astro doesn't seem to load env vars in dev mode (and import.meta.env types don't work) so load via vite instead.
const { ATPROTO_DID } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export async function GET() {
    if (!ATPROTO_DID) {
        throw new Error("ATPROTO_DID environment variable not found, unable to build ./well-known/atproto-did.")
    }

    return new Response(ATPROTO_DID, {
        headers: {
            "Content-Type": "text/plain",
        }
    });
}
