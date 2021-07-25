import React from "react";
import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";

const IndexPage = () => {
  return (
      <PageLayout>
          <PageMetadata
              title={"Home"}
          />
          <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
              <div className="max-w-2xl mx-auto px-2 mb-8">
                  <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Hello, I&apos;m Ben Ryder</h1>
                  <p className="text-2xl text-blue-600 font-bold">Apprentice Developer</p>
                  <p className="mt-3 prose leading-normal">
                      I&apos;m an Apprentice Developer and Degree Apprentice.
                      My day to day work is with Drupal and other web technologies.
                      In my spare time I make websites, desktop apps, python games and
                      anything else that catches my interest.
                  </p>
                  <p className="prose mt-2">Find me online: <a href="">GitHub</a>, <a href="">LinkedIn</a>, <a href="">Drupal.org</a>.</p>
              </div>
          </main>
      </PageLayout>
  );
};

export default IndexPage;
