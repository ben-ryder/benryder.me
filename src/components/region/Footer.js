import React from "react";
import LinkComponent from "../elements/LinkComponent";
import {graphql, useStaticQuery} from "gatsby";

const Footer = () => {
  const footerData = useStaticQuery(graphql`
    query Footer {
      contentfulFooter {
        menus {
          title
          links {
            text
            url
          }
        }
        signOffContent {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `).contentfulFooter;

  return (
    <footer className="py-4 text-gray-500 bg-brand-background-secondary text-brand-text-secondary">
      <div className="sm:flex sm:justify-between max-w-2xl mx-auto px-4">
        {footerData.menus.map((menu) => (
          <div key={menu.title} className="mt-4">
            <ul className="mt-1">
              {menu.links.map((link) => (
                <li key={link.url}>
                  <LinkComponent
                    className="block py-1 hover:underline"
                    url={link.url}
                    text={link.text}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="flex justify-center max-w-2xl mx-auto py-4"
        dangerouslySetInnerHTML={{__html: footerData.signOffContent.childMarkdownRemark.html}}
      />
    </footer>
  );
};

export default Footer;
