import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList, FaHome, FaUserPlus } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <NavLink to="/WeeklyFeedback" className="footer-link">
                <span className="footer-icon">
                    <FaClipboardList size={24} />
                </span>
            </NavLink>
            <div className="divider"></div>
            <NavLink to="/HomePage" className="footer-link">
                <span className="footer-icon">
                    <FaHome size={24} />
                </span>
            </NavLink>
            <div className="divider"></div>
            <NavLink to="/addChild" className="footer-link">
                <span className="footer-icon">
                    <FaUserPlus size={24} />
                </span>
            </NavLink>
        </footer>
    );
}

export default Footer;
