import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

// Region Components
import Header from "../components/region/Header";
import Footer from "../components/region/Footer";

// Assets
import SiteIcon from "../images/icon.png";

const PageLayout = ({ children }) => {
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

PageLayout.propTypes = {
    children: PropTypes.any
}

export default PageLayout;
