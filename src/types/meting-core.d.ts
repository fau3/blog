declare module "@meting/core" {
	export default class Meting {
		constructor(server: string);
		album(id: string): Promise<string>;
		cookie(value: string): this;
		format(value: boolean): this;
		lyric(id: string): Promise<string>;
		pic(id: string, size: number): Promise<string>;
		song(id: string): Promise<string>;
	}
}
