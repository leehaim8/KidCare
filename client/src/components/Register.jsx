import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            alert("An error occurred while registering. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="login-register">
            <form className="form" onSubmit={handleRegister}>
                <div>
                    <h1>Register</h1>
                    <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
