import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft notes based on the environment */
export async function getAllNotes(): Promise<CollectionEntry<"note">[]> {
	return await getCollection("note", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** filter out draft English notes based on the environment */
export async function getAllNotesEn(): Promise<CollectionEntry<"noteEn">[]> {
	return await getCollection("noteEn", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}
