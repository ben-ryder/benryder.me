import React from "react";
import LinkComponent from "../elements/LinkComponent";

const Footer = () => {
  const footerMenus = [
    {
      displayName: "Find Me Online",
      menuLinks: [
        { text: "Contact", url: "/contact" },
        { text: "GitHub", url: "https://github.com/Ben-Ryder" },
        { text: "Linkedin", url: "https://www.linkedin.com/in/benryderdev/" },
        { text: "Drupal.org", url: "https://www.drupal.org/u/ben-ryder" },
      ],
    },
    {
      displayName: "Projects",
      menuLinks: [
        { text: "TwoPence", url: "https://twopence.benryder.dev/" },
        { text: "Terminal Site", url: "https://terminal.benryder.me/" },
        { text: "Writing Prompts", url: "https://writingprompts.benryder.me/" },
      ],
    },
    {
      displayName: "Legal Bits",
      menuLinks: [
        { text: "Credits", url: "/credits" },
        { text: "License", url: "/license" },
        { text: "Cookie & Privacy Policy", url: "/cookie-and-privacy-policy" },
      ],
    },
  ];

  const signOffContent = <p>© Ben Ryder 2021</p>;

  return (
    <footer className="text-gray-500">
      <div className="sm:flex sm:justify-between max-w-2xl mx-auto px-4 border-t-2">
        {footerMenus.map((menu) => (
          <div key={menu.displayName.toLowerCase()} className="mt-4">
            <ul className="mt-1">
              {menu.menuLinks.map((link) => (
                <li key={link.url}>
                  <LinkComponent
                    className="block py-1"
                    url={link.url}
                    text={link.text}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center max-w-2xl mx-auto py-4">
        {signOffContent}
      </div>
    </footer>
  );
};

export default Footer;
