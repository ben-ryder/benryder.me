
interface ContentWithTimestamps {
	data: {
		createdAt: string;
		updatedAt: string | null;
	}
}

export function orderByTimestamps<Entity extends ContentWithTimestamps>(list: Entity[]) {
	return list.sort((a, b) => {
		return (a.data.updatedAt ?? a.data.createdAt) > ( b.data.updatedAt ?? b.data.createdAt) ? -1 : 1;
	})
}
