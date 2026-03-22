import type { APIRoute } from "astro";
import { fediverseNodeInfoUrl, isFediverseEnabled } from "@/utils/fediverse";

export const GET: APIRoute = async () => {
	if (!isFediverseEnabled()) {
		return new Response("Not Found", {
			status: 404,
		});
	}

	return new Response(null, {
		headers: {
			Location: fediverseNodeInfoUrl,
		},
		status: 308,
	});
};
