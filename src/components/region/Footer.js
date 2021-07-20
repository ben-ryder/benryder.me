import React from "react";
import {Link} from "gatsby";

const Footer = () => {
    const footerMenus = [
        {

            displayName: "Find Me Online",
            menuLinks: [
                {text: "Contact", url: "/contact"},
                {text: "GitHub", url: "https://github.com/Ben-Ryder"},
                {text: "Linkedin", url: "https://www.linkedin.com/in/benryderdev/"},
                {text: "Drupal.org", url: "https://www.drupal.org/u/ben-ryder"},
            ]
        },
        {

            displayName: "Projects",
            menuLinks: [
                {text: "TwoPence", url: "https://twopence.benryder.dev/"},
                {text: "Terminal Site", url: "https://terminal.benryder.me/"},
                {text: "Writing Prompts", url: "https://writingprompts.benryder.me/"}
            ]
        },
        {
            displayName: "Legal Bits",
            menuLinks: [
                {text: "Credits", url: "/credits"},
                {text: "License", url: "/license"},
                {text: "Cookie & Privacy Policy", url: "/cookie-and-privacy-policy"},
            ]
        }
    ];

    const signOffText = "&#169; Ben Ryder 2021"
    
    return (
        <footer>
            <div>
                {footerMenus.map((menu) =>
                    <div key={menu.displayName.toLowerCase()}>
                        <p>{menu.displayName}</p>
                        <ul>
                            {menu.menuLinks.map((link) =>
                                <li key={link.url}>
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                { signOffText }
            </div>
        </footer>
    )
}

export default Footer;
