import type { APIRoute } from "astro";
import Meting from "@meting/core";

export const prerender = false;

const JSON_HEADERS = {
	"cache-control": "public, max-age=0, s-maxage=43200, stale-while-revalidate=86400",
	"content-type": "application/json; charset=utf-8",
};

const COVER_SIZE = 300;
const NETEASE_ORIGIN = "https://music.163.com";
const NETEASE_HEADERS = {
	"user-agent":
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
};

type SupportedServer = "netease";
type SupportedType = "album" | "song";

interface MetingTrack {
	album?: string;
	artist?: string[];
	cover?: string;
	id: string;
	lrc?: string;
	lyric_id?: string;
	name: string;
	pic_id?: string;
	source?: string;
	url_id?: string;
}

interface PlayerTrack {
	artist: string;
	cover: string;
	lrc: string;
	name: string;
	url: string;
}

function jsonError(status: number, message: string) {
	return new Response(JSON.stringify({ error: message }), {
		headers: JSON_HEADERS,
		status,
	});
}

function parseJson(payload: string): unknown {
	try {
		return JSON.parse(payload);
	} catch {
		return payload;
	}
}

function pickFirstString(value: unknown, preferredKeys: string[] = []): string {
	if (typeof value === "string") return value.trim();
	if (!value || typeof value !== "object") return "";

	if (Array.isArray(value)) {
		for (const item of value) {
			const result = pickFirstString(item, preferredKeys);
			if (result) return result;
		}
		return "";
	}

	const record = value as Record<string, unknown>;
	for (const key of preferredKeys) {
		const candidate = record[key];
		if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
	}

	for (const candidate of Object.values(record)) {
		const result = pickFirstString(candidate, preferredKeys);
		if (result) return result;
	}

	return "";
}

function parseNeteaseTracks(payload: string): MetingTrack[] {
	const parsed = parseJson(payload);
	if (!parsed || typeof parsed !== "object") return [];

	const songs = (parsed as { songs?: unknown }).songs;
	if (!Array.isArray(songs)) return [];

	return songs
		.map((song): MetingTrack | null => {
			if (!song || typeof song !== "object") return null;

			const record = song as {
				al?: { name?: string; pic?: number | string; pic_str?: number | string };
				ar?: Array<{ name?: string }>;
				id?: number | string;
				name?: string;
			};

			const id = record.id ? String(record.id) : "";
			const name = record.name?.trim() ?? "";
			if (!id || !name) return null;

			const picId = record.al?.pic_str ?? record.al?.pic;

			const track: MetingTrack = {
				album: record.al?.name ?? "",
				artist: Array.isArray(record.ar)
					? record.ar.map((artist) => artist?.name?.trim() ?? "").filter(Boolean)
					: [],
				id,
				lyric_id: id,
				name,
				url_id: id,
			};

			if (picId) {
				track.pic_id = String(picId);
			}

			return track;
		})
		.filter((track): track is MetingTrack => track !== null);
}

function decodeHtml(value: string) {
	return value
		.replaceAll("&amp;", "&")
		.replaceAll("&quot;", '"')
		.replaceAll("&#39;", "'")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">");
}

function matchFirst(html: string, pattern: RegExp) {
	const match = html.match(pattern);
	return match?.[1] ? decodeHtml(match[1].trim()) : "";
}

function extractSongArtist(description: string) {
	const match = description.match(/由\s+(.+?)\s+演唱/);
	if (!match?.[1]) return "";
	return decodeHtml(match[1].trim());
}

async function loadSongFallback(id: string): Promise<MetingTrack | null> {
	try {
		const response = await fetch(`${NETEASE_ORIGIN}/song?id=${id}`, {
			headers: NETEASE_HEADERS,
		});
		if (!response.ok) return null;

		const html = await response.text();
		const name =
			matchFirst(html, /<meta property="og:title" content="([^"]+)"/i) ||
			matchFirst(html, /<title>([^<]+?) - .*? - 单曲 - 网易云音乐<\/title>/i);
		const description = matchFirst(html, /<meta property="og:description" content="([^"]+)"/i);
		const artist = extractSongArtist(description);
		const cover =
			matchFirst(html, /<meta property="og:image" content="([^"]+)"/i) ||
			matchFirst(html, /<meta itemprop="images" content="([^"]+)"/i);

		if (!name) return null;

		return {
			artist: artist ? [artist] : [],
			cover,
			id,
			name,
		};
	} catch {
		return null;
	}
}

async function loadTracks(meting: Meting, type: SupportedType, id: string) {
	if (type === "song") {
		const tracks = parseNeteaseTracks(await meting.song(id));
		if (tracks.length) return tracks;

		const fallbackTrack = await loadSongFallback(id);
		return fallbackTrack ? [fallbackTrack] : [];
	}

	return parseNeteaseTracks(await meting.album(id));
}

function loadUrl(track: MetingTrack) {
	const targetId = track.url_id ?? track.id;
	return `https://music.163.com/song/media/outer/url?id=${targetId}.mp3`;
}

async function loadCover(meting: Meting, track: MetingTrack) {
	if (track.cover) return track.cover;

	const targetId = track.pic_id ?? track.id;
	try {
		const payload = await meting.pic(targetId, COVER_SIZE);
		return pickFirstString(parseJson(payload), ["url", "cover", "pic"]);
	} catch {
		return "";
	}
}

async function loadLyric(meting: Meting, track: MetingTrack) {
	if (track.lrc) return track.lrc;

	const targetId = track.lyric_id ?? track.id;
	try {
		const payload = await meting.lyric(targetId);
		return pickFirstString(parseJson(payload), ["lyric", "lrc"]);
	} catch {
		return "";
	}
}

async function toPlayerTrack(meting: Meting, track: MetingTrack): Promise<PlayerTrack | null> {
	const [url, cover, lrc] = await Promise.all([
		loadUrl(track),
		loadCover(meting, track),
		loadLyric(meting, track),
	]);

	if (!url) return null;

	return {
		artist: Array.isArray(track.artist) ? track.artist.join(" / ") : "",
		cover,
		lrc,
		name: track.name || "Unknown track",
		url,
	};
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const server = (url.searchParams.get("server") || "").trim() as SupportedServer;
	const type = (url.searchParams.get("type") || "").trim() as SupportedType;
	const id = (url.searchParams.get("id") || "").trim();

	if (server !== "netease") {
		return jsonError(400, "Only the netease server is supported.");
	}

	if (type !== "song" && type !== "album") {
		return jsonError(400, "Only song and album embeds are supported.");
	}

	if (!id) {
		return jsonError(400, "Missing music id.");
	}

	try {
		const meting = new Meting(server);
		meting.format(false);

		const cookie = process.env.METING_NETEASE_COOKIE?.trim();
		if (cookie) {
			meting.cookie(cookie);
		}

		const tracks = await loadTracks(meting, type, id);
		const audio = (
			await Promise.all(tracks.map((track) => toPlayerTrack(meting, track)))
		).filter((track): track is PlayerTrack => Boolean(track));

		return new Response(JSON.stringify(audio), {
			headers: JSON_HEADERS,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unable to load music data.";
		return jsonError(502, message);
	}
};
