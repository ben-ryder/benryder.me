import readingTime from "reading-time/lib/reading-time.js";

// Library does define types, but can't seem to include them in any way.
interface ReadingTimeResult {
	text: string;
	time: number;
	minutes: number;
	words: {
		total: number
	};
}

export function getReadingTime(text: string): string {
	const stats: ReadingTimeResult = readingTime(text);
	return stats.text;
}