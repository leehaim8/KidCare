import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaChartBar, FaClipboardList, FaBook, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("birthdayModalShown");
        navigate("/login");
    };

    return (
        <div>
            {!isOpen && (<button className="menu-button" onClick={toggleMenu}>☰</button>)}
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✖</button>
                <nav className="menu-nav">
                    <ul className="top-links">
                        <li><Link to="/HomePage"> <FaHome /> HomePage</Link></li>
                        <li><Link to="/WeeklyFeedback"><FaChartBar /> Weekly Feedback</Link></li>
                        <li><Link to="#"><FaClipboardList /> Periodic Feedback</Link></li>
                        <li><Link to="#"><FaBook /> Resource Library</Link></li>
                        <li><Link to="/Experts"><FaUserFriends /> External Professional Directory</Link></li>
                    </ul>
                    <ul className="bottom-links">
                        <li><button onClick={handleLogout}><FaSignOutAlt /> Log-out</button></li>
                        <li><Link to="#"><FaCog /> Setting</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
