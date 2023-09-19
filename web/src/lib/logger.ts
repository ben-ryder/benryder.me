
export class Logger {
	static log(data: any) {
		if (import.meta.env.LOGGER_ENABLED === 'true') {
			console.log(data)
		}
	}
}