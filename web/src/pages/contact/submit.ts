import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const name = data.get("name");
	const email = data.get("email");
	const subject = data.get("message");
	const message = data.get("message");
	const honeypot = data.get("message");
	const captcha = data.get("captcha");

	if (honeypot) {
		return new Response("Invalid data", { status: 400 });
	}

	if (!name || !email || !subject || !message || !captcha) {
		return new Response("Invalid data", { status: 400 });
	}


	try {
		const res = await fetch(process.env.CAPTCHA_ENDPOINT as string, {
			method: 'POST',
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				'secret': process.env.CAPTCHA_SECRET as string,
				'response': captcha as string
			}).toString()
		});
		const data = await res.json()

		if (!data.success) {
			return new Response("Invalid data", { status: 400 });
		}
	}
	catch (e) {
		// todo: send some sort of error notification
		console.log(e);
		return new Response("Server error", { status: 500 });
	}

	// todo: send submission via mailgun

	// Do something with the data, then return a success response
	return new Response(
		JSON.stringify({
			message: "Success!"
		}),
		{ status: 200 }
	);
};
