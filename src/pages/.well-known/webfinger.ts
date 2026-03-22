import type { APIRoute } from "astro";
import {
	getFediverseWebfingerDocument,
	isFediverseEnabled,
	matchesFediverseResource,
} from "@/utils/fediverse";

export const GET: APIRoute = async ({ url }) => {
	if (!isFediverseEnabled() || !matchesFediverseResource(url.searchParams.get("resource"))) {
		return new Response("Not Found", {
			status: 404,
		});
	}

	return new Response(JSON.stringify(getFediverseWebfingerDocument()), {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "public, max-age=300",
			"Content-Type": "application/jrd+json; charset=utf-8",
		},
		status: 200,
	});
};
