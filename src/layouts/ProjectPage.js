import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";

import ProseContent from "../components/ProseContent";
import PageMetadata from "../components/PageMetadata";
import CTALink from "../components/CTALink";
import RelatedContent from "../components/RelatedContent";
import MetadataSection from "../components/MetadataSection";
import TagList from "../components/TagList";

import {
  Calendar as CalendarIcon,
  Github as GithubIcon,
  Globe as GlobeIcon
} from "lucide-react";

const ProjectPage = ({ data }) => {
  data = data.contentfulProject;

  let projectMetadata = [
    {
      text: "Published " + data.publishedDate,
      icon: <CalendarIcon size="20" className="stroke-brand" />
    }
  ];
  if (data.repositoryUrl) {
    projectMetadata.push({
      text: "Source Code",
      link: data.repositoryUrl,
      icon: <GithubIcon size="20" className="stroke-brand" />
    })
  }
  if (data.productUrl) {
    projectMetadata.push({
      text: "Live Project",
      link: data.productUrl,
      icon: <GlobeIcon size="20" className="stroke-brand" />
    })
  }

  return (
    <PageLayout>
      <PageMetadata
        title={data.metaData.title}
        description={data.metaData.description.description}
        keywords={data.metaData.keywords}
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <div className="font-bold text-brand-text-primary">
            <CTALink url="/projects" text="All Projects" direction="left" />
          </div>
          <div className="mt-5 sm:mt-8">
            <h1 className="text-4xl font-extrabold text-brand-text-primary">{data.title}</h1>
            <MetadataSection data={projectMetadata} />
          </div>
        </div>
        {data.body.childMarkdownRemark && (
          <ProseContent htmlString={data.body.childMarkdownRemark.html}/>
        )}
        <div className="max-w-2xl mx-auto mt-8 px-2">
          <TagList tagList={data.tags} tagUrl="/projects/tags/" />
        </div>
        {(data.relatedArticles || data.relatedProjects) &&
          <RelatedContent
            articles={data.relatedArticles}
            projects={data.relatedProjects}
          />
        }
      </main>
    </PageLayout>
  );
};

ProjectPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($projectID: String!) {
    contentfulProject(id: {eq: $projectID}) {
      title
      publishedDate(formatString: "do MMM, YYYY")
      tags
      repositoryUrl
      productUrl
      body {
        childMarkdownRemark {
          html
        }
      }
      metaData {
        title
        description {
          description
        }
        keywords
      }
      relatedArticles {
        title
        fields {
          urlSlug
        }
        description {
          description
        }
      }
      relatedProjects {
        title
        fields {
          urlSlug
        }
        description {
          description
        }
      }
    }
  }
`;

export default ProjectPage;
