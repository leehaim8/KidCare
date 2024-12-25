import React from "react";
import Navbar from "./Navbar";

function Header() {
    return (
        <div className="header-container">
            <Navbar />
            <header>
                <div className="logo"></div>
            </header>
        </div>
    );
}

export default Header;