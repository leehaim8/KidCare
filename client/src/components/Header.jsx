import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Header() {
    const [user, setUser] = useState([]);
    const userId = localStorage.getItem("token");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://kidcare-a7p0.onrender.com/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching children:", error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="header-container">
            <Navbar />
            <header>
                <a href="/HomePage"><div className="logo"></div></a>
            </header>
            <img src={`https://kidcare-a7p0.onrender.com/public/${user.image}`} alt={user.name}></img>
        </div>
    );
}

export default Header;