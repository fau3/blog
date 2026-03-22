import { siteConfig } from "@/site.config";

export const fediverseHandle = `@${siteConfig.fediverse.username}@${siteConfig.fediverse.accountDomain}`;
export const fediverseAcct = `acct:${siteConfig.fediverse.username}@${siteConfig.fediverse.accountDomain}`;
export const fediverseWebfingerTemplate = `${siteConfig.url}/.well-known/webfinger?resource={uri}`;
export const fediverseNodeInfoUrl = `${siteConfig.fediverse.instanceUrl}/.well-known/nodeinfo`;

export function isFediverseEnabled() {
	return siteConfig.fediverse.enabled;
}

export function matchesFediverseResource(resource: null | string) {
	if (!resource) {
		return false;
	}

	return resource.toLowerCase() === fediverseAcct.toLowerCase();
}

export function getFediverseWebfingerDocument() {
	return {
		subject: fediverseAcct,
		aliases: [siteConfig.fediverse.profileUrl, siteConfig.fediverse.actorUrl],
		links: [
			{
				rel: "self",
				type: "application/activity+json",
				href: siteConfig.fediverse.actorUrl,
			},
			{
				rel: "http://webfinger.net/rel/profile-page",
				type: "text/html",
				href: siteConfig.fediverse.profileUrl,
			},
		],
	};
}
