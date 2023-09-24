import { defineHook } from '@directus/extensions-sdk';
import { createError } from '@directus/errors';
import verifyCaptcha from "./verify-captcha";

const InvalidRequestError = createError('INVALID_REQUEST_ERROR', 'The request appears invalid or not genuine.', 400);

export default defineHook(({ filter }, {env, exceptions }) => {
	filter('form_contact.items.create', async (input) => {
		if (input.honeypot) {
			throw new InvalidRequestError()
		}

		if (!input.captcha) {
			throw new InvalidRequestError()
		}

		// Verify captcha value with service
		// https://docs.hcaptcha.com/#verify-the-user-response-server-side
		const captchaSecret = env.CAPTCHA_SECRET;
		const captchaUrl = env.CAPTCHA_VERIFICATION_URL;
		if (!captchaUrl || !captchaSecret) {
			// @todo - trigger some sort of error notification
			throw new InvalidRequestError()
		}

		const isValidCaptcha = await verifyCaptcha({
			url: captchaUrl,
			secret: captchaSecret
		}, input.captcha);

		if (!isValidCaptcha) {
			throw new InvalidRequestError()
		}

		return input;
	});
});
