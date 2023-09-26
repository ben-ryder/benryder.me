import { defineHook } from '@directus/extensions-sdk';
import { createError } from '@directus/errors';
import verifyCaptcha from "./verify-captcha";

const InvalidRequestError = createError('INVALID_REQUEST_ERROR', 'The request appears invalid or not genuine.', 400);

const InvalidCaptchaConfig = createError('INVALID_REQUEST_ERROR', 'The captcha service is not set up correctly.', 500);
const IncludedHoneypotError = createError('INVALID_REQUEST_ERROR', 'The request includes a honeypot value.', 400);
const MissingCaptchaError = createError('INVALID_REQUEST_ERROR', 'The request is missing a captcha value.', 400);
const FailedCaptchaError = createError('INVALID_REQUEST_ERROR', 'The captcha value supplied is not valid.', 400);

interface RequestData {
	name: string
	email: string
	message: string
	honeypot?: string | null
	captcha?: string | null
}

function getSafeError(environment: string, error: any) {
	if (environment == 'dev') {
		return new error()
	}
	else {
		return new InvalidRequestError()
	}
}

/**
 * Define a Directus hook which intercepts adding a new contact form
 * submission to check for a honeypot value or missing/failed captcha.
 */
export default defineHook(({ filter }, {env }) => {
	filter('form_contact.items.create', async (input) => {
		const requestData = input as RequestData;
		const environment = env.ENVIRONMENT || 'live';

		if (requestData.honeypot) {
			throw getSafeError(environment, IncludedHoneypotError)
		}

		if (!requestData.captcha) {
			throw getSafeError(environment, MissingCaptchaError)
		}

		if (!env.CAPTCHA_VERIFICATION_URL || !env.CAPTCHA_SECRET) {
			// @todo - trigger some sort of error notification
			throw getSafeError(environment, InvalidCaptchaConfig)
		}

		const isValidCaptcha = await verifyCaptcha({
			url: env.CAPTCHA_VERIFICATION_URL,
			secret: env.CAPTCHA_SECRET
		}, requestData.captcha);

		if (!isValidCaptcha) {
			throw getSafeError(environment, FailedCaptchaError)
		}

		return input;
	});
});
