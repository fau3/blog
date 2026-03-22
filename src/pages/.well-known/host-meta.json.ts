import type { APIRoute } from "astro";
import { fediverseWebfingerTemplate, isFediverseEnabled } from "@/utils/fediverse";

export const GET: APIRoute = async () => {
	if (!isFediverseEnabled()) {
		return new Response("Not Found", {
			status: 404,
		});
	}

	return Response.json(
		{
			links: [
				{
					rel: "lrdd",
					type: "application/jrd+json",
					template: fediverseWebfingerTemplate,
				},
			],
		},
		{
			headers: {
				"Cache-Control": "public, max-age=300",
			},
		},
	);
};
