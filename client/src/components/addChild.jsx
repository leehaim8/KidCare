import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import Breadcrumbs from "./Breadcrumbs";

function AddChild() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        allergies: [],
        motherName: "",
        fatherName: "",
        phone: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevData) => {
                if (checked) {
                    return {
                        ...prevData,
                        allergies: [...prevData.allergies, value]
                    };
                } else {
                    return {
                        ...prevData,
                        allergies: prevData.allergies.filter((allergy) => allergy !== value)
                    };
                }
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const userID = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/children/${userID}/addChild`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate("/HomePage");
            } else {
                const errorData = await response.json();
                alert(`Add child failed: ${errorData.message}`);
            }
        } catch (error) {
            alert("An error occurred while adding child. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            <Breadcrumbs />
            <div className="add-child-container">
                <h1>Add a Child</h1>
                <form className="add-child-form" onSubmit={handleRegister}>
                    <div className="add-child-div">
                        <label>Child Name:</label>
                        <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="add-child-div">
                        <label>Child Age:</label>
                        <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="add-child-div">
                        <label>Child Mother Name:</label>
                        <Input type="text" name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} />
                    </div>
                    <div className="add-child-div">
                        <label>Child Father Name:</label>
                        <Input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} />
                    </div>
                    <div className="add-child-div">
                        <label>Phone Number:</label>
                        <Input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="child-allergies">
                        <label>Child Allergies:</label>
                        <div>
                            <label className="child-allergies-label">
                                <input type="checkbox" name="allergies" value="Peanuts" checked={formData.allergies.includes("Peanuts")} onChange={handleChange} />Peanuts
                            </label>
                            <label className="child-allergies-label">
                                <input type="checkbox" name="allergies" value="Milk" checked={formData.allergies.includes("Milk")} onChange={handleChange} /> Milk
                            </label>
                            <label className="child-allergies-label">
                                <input type="checkbox" name="allergies" value="Fish" checked={formData.allergies.includes("Fish")} onChange={handleChange} />Fish
                            </label>
                            <label className="child-allergies-label">
                                <input type="checkbox" name="allergies" value="Eggs" checked={formData.allergies.includes("Eggs")} onChange={handleChange} />Eggs
                            </label>
                            <label className="child-allergies-label">
                                <input type="checkbox" name="allergies" value="Soy" checked={formData.allergies.includes("Soy")} onChange={handleChange} />Soy
                            </label>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddChild;
