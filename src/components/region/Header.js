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
        <header className="flex h-20 px-4">
            <nav className="w-full flex justify-between max-w-3xl mx-auto">
                <LinkComponent url={"/"} className="flex items-center">
                    <i className="w-9 h-9 rounded-full bg-blue-600" />
                    <p className="pl-2">Ben Ryder</p>
                </LinkComponent>
                <ul className="flex justify-between items-center text-gray-500">
                    {mainMenuLinks.map((navLink) =>
                        <li key={navLink.url} className="ml-3">
                            <LinkComponent url={navLink.url} text={navLink.text}/>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
