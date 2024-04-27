import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {
    JButton,
    JButtonGroup,
    JCallout, JErrorText,
    JForm,
    JFormContent,
    JFormHeader,
    JFormRow,
    JInput, JLabel,
    JTextArea
} from "@ben-ryder/jigsaw-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ContactFormData = z
    .object({
        name: z
            .string({ required_error: "This field is required." })
            .min(1, "This field is required."),
        email: z
            .string({ required_error: "This field is required." })
            .min(1, "This field is required.")
            .email({ message: "Must be an email format" }),
        subject: z
            .string({ required_error: "This field is required." })
            .min(1, "This field is required."),
        message: z
            .string({ required_error: "This field is required." })
            .min(1, "This field is required."),
    })
    .strict();
type ContactFormData = z.infer<typeof ContactFormData>;

import "./ContactForm.scss"

export function ContactForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, isSubmitted },
        clearErrors,
        reset,
        setError
    } = useForm<ContactFormData>({
        resolver: zodResolver(ContactFormData),
        mode: "onTouched",
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });
    const [success, setSuccess] = useState<boolean>(false);

    const [captchaToken, setCaptchaToken] = useState<string|null>(null);
    const [captchaError, setCaptchaError] = useState<string|null>(null);

    const onSubmit = async (data: ContactFormData) => {
        clearErrors();
        setCaptchaError(null);

        if (!captchaToken) {
            setCaptchaError('You must complete the captcha.')
            return;
        }

        const body = JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            captcha: captchaToken,
        })

        try {
            const res = await fetch(import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: body
            });
            if (res.ok) {
                setSuccess(true);
                reset();
                return;
            }
            else {
                setSuccess(false)
            }
        }
        catch (e) {
            setSuccess(false)
        }

        setError('root', {type: 'string', message: 'An unexpected error occurred while submitting your data. Please try again or you could report this issue on Github.'})
    };

    const [isClient, setIsClient] = useState<boolean>(false)
    useEffect(() => {
        setIsClient(true)
    }, []);

    return (
        <JForm onSubmit={handleSubmit(onSubmit)}>
            <JFormHeader>
                <h2>✉️ Contact Me</h2>
                <p>You can use this form to contact me. I will never share your details with anyone, for more info see
                    my <a href="#">privacy policy</a>.<br/></p>
            </JFormHeader>
            <noscript className="noscript">
                <p>It looks like Javascript is disabled, and because this contact form relies on Javascript to function
                    it is currently hidden.</p>
                <p>If you wish to use this form, you must allow Javascript execution for this website and
                    hcaptcha.com.</p>
            </noscript>
            <JFormContent style={isClient ? {} : {display: 'none'}}>
                <JFormRow>
                    {success && (
                        <JCallout variant="success">
                            <p>Your submission has been submitted!</p>
                        </JCallout>
                    )}
                    {errors.root && (
                        <JCallout variant="critical"><p>{errors.root.message}</p></JCallout>
                    )}
                </JFormRow>
                <JFormRow>
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <JInput
                                label="Name"
                                placeholder="John Smith / johnsmith12"
                                required={true}
                                {...field}
                                error={errors.name?.message}
                            />
                        )}
                    />
                </JFormRow>
                <JFormRow>
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <JInput
                                label="Email"
                                placeholder="johnsmith12@example.com"
                                required={true}
                                {...field}
                                error={errors.email?.message}
                            />
                        )}
                    />
                </JFormRow>
                <JFormRow>
                    <Controller
                        name="subject"
                        control={control}
                        render={({field}) => (
                            <JInput
                                label="Subject"
                                placeholder="I'm contacting you about..."
                                required={true}
                                {...field}
                                error={errors.subject?.message}
                            />
                        )}
                    />
                </JFormRow>
                <JFormRow>
                    <Controller
                        name="message"
                        control={control}
                        render={({field}) => (
                            <JTextArea
                                label="Message"
                                placeholder="Your message here..."
                                rows={4}
                                required={true}
                                {...field}
                                error={errors.message?.message}
                            />
                        )}
                    />
                </JFormRow>
                <JFormRow>
                    <div className='captcha'>
                        <JLabel htmlFor="captcha__label">Captcha</JLabel>
                        <div className='captcha__element'>
                            <HCaptcha
                                sitekey={import.meta.env.PUBLIC_CAPTCHA_SITE_KEY}
                                onVerify={(token) => {
                                    setCaptchaToken(token)
                                }}
                                onError={() => setCaptchaToken(null)}
                                onExpire={() => setCaptchaToken(null)}
                            />
                        </div>
                    </div>
                    {captchaError && <JErrorText>{captchaError}</JErrorText>}
                </JFormRow>
                <JFormRow>
                    <JButtonGroup>
                        {/**
                         Once submitted the form must be touched again for a validation check to occur.
                         To prevent the button being disabled until that happens, isSubmitted is also checked.
                         **/}
                        <JButton type="submit" disabled={!isValid && !isSubmitted} loading={isSubmitting}>
                            Send
                        </JButton>
                    </JButtonGroup>
                </JFormRow>
            </JFormContent>
        </JForm>
    );
}