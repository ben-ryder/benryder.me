import React from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import FormRow from "../components/forms/FormRow";
import FormInput from "../components/forms/FormInput";
import FormSubmitButton from "../components/forms/FormSubmitButton";
import FormTextArea from "../components/forms/FormTextArea";

const ContactForm = () => {
  const contactFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("It would be nice to know what to call you."),
    email: Yup.string()
      .required("I may want to follow up on your message. I'll need an email address for that.")
      .email("That doesn't look like a valid email address."),
    subject: Yup.string()
      .required("It's useful to know what you're contacting me about."),
    message: Yup.string()
      .required("What actual message do you want to send to me?")
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const contactFormOnSubmit = () => {
    console.log("form submit")
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactFormSchema}
      onSubmit={contactFormOnSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FormRow>
            <FormInput
              type="text"
              id="name"
              name="name"
              label="Name"
              error={errors.name && touched.name ? errors.name : null}
            />
          </FormRow>
          <FormRow>
            <FormInput
              type="email"
              id="email"
              name="email"
              label="Email Address"
              error={errors.email && touched.email ? errors.email : null}
            />
          </FormRow>
          <FormRow>
            <FormInput
              type="text"
              id="subject"
              name="subject"
              label="Subject"
              error={errors.subject && touched.subject ? errors.subject : null}
            />
          </FormRow>
          <FormRow>
            <FormTextArea
              type="text"
              id="message"
              name="message"
              label="Message"
              error={errors.message && touched.message ? errors.message : null}
              rows={3}
              htmlResize={false}
            />
          </FormRow>
          <FormRow className="mt-4 flex justify-end">
            <FormSubmitButton type="submit" isSubmitting={isSubmitting}>Send</FormSubmitButton>
          </FormRow>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm;