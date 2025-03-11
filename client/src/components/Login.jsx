import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://kidcare-a7p0.onrender.com/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.user.userID);
                navigate("/HomePage");
            } else {
                alert(data.message || "User not found. Please register.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <div className="login-register">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
