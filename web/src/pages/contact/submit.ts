import type { APIRoute } from "astro";
import {z, ZodError} from "zod";
import Mailgun, {type MailgunClientOptions} from "mailgun.js";

// Signal that this route is an API endpoint which should be handled on demand.
export const prerender = false

export const ContactSubmission = z.object({
	name: z.string().min(1, 'please enter a name'),
	email: z.string().email('please enter valid email address'),
	subject: z.string().min(1, 'please enter a subject'),
	message: z.string().min(1, 'please enter a message'),
	captcha: z.string().min(1, 'you must supply a captcha result'),
}).strict()
export type ContactSubmission = z.infer<typeof ContactSubmission>


export const POST: APIRoute = async ({ request }) => {

	let body: ContactSubmission
	try {
		const rawBody = await request.json();
		body = ContactSubmission.parse(rawBody);
	}
	catch (error) {
		let context: any
		if (error instanceof ZodError) {
			context = error.format()
		}

		return new Response(JSON.stringify({
			statusCode: 400,
			message: "Data failed validation",
			context: context
		}), { status: 400 });
	}

	try {
		const res = await fetch(import.meta.env.CAPTCHA_VERIFICATION_URL, {
			method: 'POST',
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				'secret': import.meta.env.CAPTCHA_SECRET!,
				'response': body.captcha
			}).toString()
		});
		const data = await res.json()

		if (!data.success) {
			return new Response(JSON.stringify({
				statusCode: 400,
				message: "Data failed validation",
				context: "provided captcha result was rejected"
			}), { status: 400 });
		}
	}
	catch (e) {
		// todo: send some sort of error notification?
		console.log(e);

		return new Response(JSON.stringify({
			statusCode: 500,
			message: "A server error occurred",
			context: "failed to validate captcha",
		}), { status: 500 });
	}

	const mailgun = new Mailgun.default(FormData);
	const options: MailgunClientOptions = {
		username: "api",
		key: import.meta.env.EMAIL_MAILGUN_API_KEY!,
	}
	if (import.meta.env.EMAIL_MAILGUN_IS_EU) {
		options.url = "https://api.eu.mailgun.net";
	}
	const mailgunClient = mailgun.client(options);
	const senderString = `benryder.me contact form <${import.meta.env.EMAIL_MAILGUN_SENDER_ADDRESS}@${import.meta.env.EMAIL_MAILGUN_DOMAIN}>`;

	const result = await mailgunClient.messages.create(
		import.meta.env.EMAIL_MAILGUN_DOMAIN!,
		{
			from: senderString,
			to: [import.meta.env.EMAIL_TO!],
			subject: `[benryder.me] ${body.subject}`,
			text: `Name: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject}\nMessage:\n${body.message}`
		}
	)
	if (result.status !== 200) {
		return new Response(JSON.stringify({
			statusCode: 500,
			message: "A server error occurred",
			context: "failed to submit",
		}), { status: 500 });
	}

	return new Response(
		JSON.stringify({
			statusCode: 200,
			message: "Submission successful"
		}),
		{ status: 200 }
	);
};
