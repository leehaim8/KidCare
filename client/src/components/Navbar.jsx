import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div>
            {!isOpen && (<button className="menu-button" onClick={toggleMenu}>☰</button>)}
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✖</button>
                <nav className="menu-nav">
                    <ul className="top-links">
                        <li><Link to="/HomePage">🏠 HomePage</Link></li>
                        <li><Link to="/WeeklyFeedback">📊 Weekly Feedback</Link></li>
                        <li><Link to="#">🔄 Periodic Feedback</Link></li>
                        <li><Link to="#">📚 Resource Library</Link></li>
                        <li><Link to="#">👥 External Professional Directory</Link></li>
                    </ul>
                    <ul className="bottom-links">
                        <li><button onClick={handleLogout}>🚪 Log-out</button></li>
                        <li><Link to="#">⚙️ Setting</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
