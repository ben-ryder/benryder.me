import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import classNames from "classnames";

import LinkComponent from "../elements/LinkComponent";

// Assets
import { Menu as MenuIcon, X as MenuCloseIcon } from "lucide-react";

const Header = () => {
  const mainMenuLinks = useStaticQuery(graphql`
    query MainNavigationMenu {
      contentfulMainNavigation {
        menu {
          links {
            text
            url
          }
        }
      }
    }
  `).contentfulMainNavigation.menu.links;

  const [mainMenuIsOpen, setMainMenuIsOpen] = React.useState(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 w-full z-10 flex h-20 px-4 bg-brand-background-secondary text-brand-text-secondary"
    >
      {mainMenuIsOpen && (
        <Helmet
          bodyAttributes={{
            class: "overflow-hidden",
          }}
        />
      )}
      <nav className="w-full flex justify-between max-w-3xl mx-auto">
        <LinkComponent url="/" className="z-20 flex items-center">
          <i className="w-9 h-9 rounded-full bg-brand" />
          <p className="pl-2 font-bold">Ben Ryder</p>
        </LinkComponent>
        <ul
          className={classNames(
            {
              hidden: !mainMenuIsOpen,
              flex: mainMenuIsOpen,
            },
            "fixed top-0 py-20 w-full h-full bg-white left-0 items-center justify-center flex-col", // fullscreen mobile layout
            "sm:relative sm:py-0 sm:w-auto sm:h-auto sm:bg-transparent sm:items-start  sm:justify-start sm:flex-row ", // reverting mobile layout for desktop
            "sm:flex sm:justify-between sm:items-center" // desktop layout
          )}
        >
          {mainMenuLinks.map((navLink) => (
            <li key={navLink.url} className="ml-4 text-xl sm:text-base">
              <LinkComponent
                url={navLink.url}
                text={navLink.text}
                className="block py-5 sm:py-0"
              />
            </li>
          ))}
        </ul>
        <button
          aria-label="Toggle Main Menu"
          className="z-20 sm:hidden"
          onClick={() => {
            setMainMenuIsOpen(!mainMenuIsOpen);
          }}
        >
          {mainMenuIsOpen ? (
            <MenuCloseIcon size={40} color="#6B7280" />
          ) : (
            <MenuIcon size={40} color="#6B7280" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
