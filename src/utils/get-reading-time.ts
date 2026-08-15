import readingTime from "reading-time"

export function getReadingTime(text: string): string {
    return readingTime(text).text
}
