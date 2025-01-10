import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <NavLink to="/WeeklyFeedback" className="footer-link">
                <span className="footer-icon">💬</span>
            </NavLink>
            <div className="divider"></div>
            <NavLink to="/HomePage" className="footer-link">
                <span className="footer-icon">🏠</span>
            </NavLink>
            <div className="divider"></div>
            <NavLink to="/addChild" className="footer-link">
                <span className="footer-icon">➕</span>
            </NavLink>
        </footer>
    );
}

export default Footer;
