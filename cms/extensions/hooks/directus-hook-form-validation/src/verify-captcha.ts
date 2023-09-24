
export interface CaptchaEnv {
    url: string,
    secret: string
}

export default async function verifyCaptcha(captchaEnv: CaptchaEnv, value: string): Promise<boolean> {
    try {
        const res = await fetch(captchaEnv.url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'secret': captchaEnv.secret,
                'response': value
            }).toString()
        });

        return res.ok
    }
    catch (e) {
        // @todo: send some sort of error notification
        return false;
    }
}