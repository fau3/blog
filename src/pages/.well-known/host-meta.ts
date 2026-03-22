import type { APIRoute } from "astro";
import { fediverseWebfingerTemplate, isFediverseEnabled } from "@/utils/fediverse";

export const GET: APIRoute = async () => {
	if (!isFediverseEnabled()) {
		return new Response("Not Found", {
			status: 404,
		});
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" type="application/jrd+json" template="${fediverseWebfingerTemplate}" />
</XRD>`;

	return new Response(body, {
		headers: {
			"Cache-Control": "public, max-age=300",
			"Content-Type": "application/xrd+xml; charset=utf-8",
		},
		status: 200,
	});
};
