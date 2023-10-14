import moment from "moment";

export function formatTimestamp(timestamp: Date): string {
	return moment(timestamp).format("MMM Do YYYY");
}