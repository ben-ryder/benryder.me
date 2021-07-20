import React from "react";
import {Link} from "gatsby";

const Header = () => {
    const mainMenuLinks = [
        {text: "About", url: "/"},
        {text: "Projects", url: "/projects"},
        {text: "Blog", url: "/blog"},
        {text: "Contact", url: "/blog"},
    ];
    
    return (
        <header>
            <nav>
                <Link to={"/"}>
                    <p>Ben Ryder</p>
                </Link>
                <ul>
                    {mainMenuLinks.map((navLink) =>
                        <li key={navLink.url}>
                            <Link to={navLink.url}>{navLink.text}</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
