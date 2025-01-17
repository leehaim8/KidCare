import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Header() {
    const [user, setUser] = useState([]);
    const userId = localStorage.getItem("token");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}`);
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
            <img src={`http://localhost:8080/public/${user.image}`} alt={user.name}></img>
        </div>
    );
}

export default Header;