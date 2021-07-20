import React from "react";
import LinkComponent from "../elements/LinkComponent";

const Header = () => {
    const mainMenuLinks = [
        {text: "About", url: "/about"},
        {text: "Projects", url: "/projects"},
        {text: "Blog", url: "/blog"},
        {text: "Contact", url: "/contact"},
    ];

    return (
        <header>
            <nav>
                <LinkComponent url={"/"}>
                    <p>Ben Ryder</p>
                </LinkComponent>
                <ul>
                    {mainMenuLinks.map((navLink) =>
                        <li key={navLink.url}>
                            <LinkComponent url={navLink.url} text={navLink.text}/>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
