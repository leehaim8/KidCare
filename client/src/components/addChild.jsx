import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import Breadcrumbs from "./Breadcrumbs";

const allergiesList = ["Peanuts", "Milk", "Fish", "Eggs", "Soy"];

function AddChild() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        allergies: [],
        motherName: "",
        fatherName: "",
        phone: "",
        gender: ""
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

        if (!formData.name || !formData.age || !formData.phone || !formData.gender || !formData.motherName || !formData.fatherName) {
            alert("Please fill in all required fields.");
            return;
        }

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
        <div className="add-child-page">
            <Header />
            <Breadcrumbs />
            <div className="add-child-container">
                <h1>Add a Child</h1>
                <form className="add-child-form" onSubmit={handleRegister}>
                    <fieldset>
                        <legend>Child Details</legend>
                        <div className="add-child-div">
                            <label>Child Name:</label>
                            <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="add-child-div">
                            <label>Child Age:</label>
                            <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="add-child-div">
                            <label>Child Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="add-child-div child-allergies">
                            <label>Child Allergies:</label>
                            <div className="child-allergies-div">
                                {allergiesList.map((allergy) => (
                                    <label className="child-allergies-label" key={allergy}>
                                        <input
                                            type="checkbox"
                                            name="allergies"
                                            value={allergy}
                                            checked={formData.allergies.includes(allergy)}
                                            onChange={handleChange}
                                        />
                                        {allergy}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Parent Details</legend>
                        <div className="add-child-div">
                            <label>Mother's Name:</label>
                            <Input type="text" name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} />
                        </div>
                        <div className="add-child-div">
                            <label>Father's Name:</label>
                            <Input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} />
                        </div>
                        <div className="add-child-div">
                            <label>Phone Number:</label>
                            <Input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        </div>
                    </fieldset>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddChild;
