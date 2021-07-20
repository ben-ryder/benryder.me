import React from "react";
import { Helmet } from "react-helmet";

// Region Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Assets
import SiteIcon from "../images/icon.png";

const RegularPage = ({ children }) => {
    return (
        <div>
            <Helmet>
                <html lang='en' />
                <meta charSet="utf-8" />
                <title>Ben Ryder</title>
                <link rel="icon" href={SiteIcon} />
            </Helmet>
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </div>
    )
}


export default RegularPage;
