import React from "react";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";

import ContactForm from "../forms/ContactForm";
import LinkComponent from "../components/elements/LinkComponent";

const ContactPage = () => {
  return (
    <PageLayout>
      <PageMetadata
        title={ "Contact Me" }
        description={ "Contact Me" }
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <h1 className="text-3xl font-extrabold text-brand-text-secondary">Contact Me</h1>
          <p className="text-brand-text-primary">
            Feel free to contact me by using the form below.
            I&apos;m always up for questions and feedback on any of
            my projects or even just a general chat.
          </p>
          <p className="mt-2 prose">
            If you&apos;re interested in how I&apos;ll use and protect
            the data you submit with this form you can check out
            my <LinkComponent url="/privacy-and-cookie-policy" text="Privacy Policy." target="_blank" rel="noreferrer noopener"/>
          </p>
        </div>
        <div className="max-w-2xl mx-auto px-2 mt-4">
          <ContactForm />
        </div>
      </main>
    </PageLayout>
  );
};

export default ContactPage;
