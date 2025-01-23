import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";

const allergiesList = ["Peanuts", "Milk", "Fish", "Eggs", "Soy"];

function AddChild() {
    const [formData, setFormData] = useState({
        name: "",
        birthday: "",
        age: "",
        allergies: [],
        motherName: "",
        fatherName: "",
        phone: "",
        gender: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        age: "",
        phone: "",
        motherName: "",
        fatherName: "",
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

        let formErrors = {};

        if (!formData.name || formData.name.length < 2) {
            formErrors.name = "Please enter a valid child name (at least 2 characters).";
        }

        if (!formData.age || formData.age <= 0) {
            formErrors.age = "Please enter a valid age (must be a positive number).";
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = "Please enter a valid phone number (10 digits).";
        }

        if (!formData.motherName) {
            formErrors.motherName = "Please enter the mother's name.";
        }

        if (!formData.fatherName) {
            formErrors.fatherName = "Please enter the father's name.";
        }

        if (!formData.gender) {
            formErrors.gender = "Please select the child's gender.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
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
            <div className="add-child-container">
                <h1>Add a Child</h1>
                <form className="add-child-form" onSubmit={handleRegister}>
                    <fieldset>
                        <legend>Child Details</legend>
                        <div className="add-child-div">
                            <label>Child Name:</label>
                            <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                            {errors.name && <p className="error">{errors.name}</p>}
                        </div>
                        <div className="add-child-div">
                            <label>Child Age:</label>
                            <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                            {errors.age && <p className="error">{errors.age}</p>}
                        </div>
                        <div className="add-child-div">
                            <label>Child Birthday:</label>
                            <Input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} />
                        </div>
                        <div className="add-child-div">
                            <label>Child Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className="error">{errors.gender}</p>}
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
                            {errors.motherName && <p className="error">{errors.motherName}</p>}
                        </div>
                        <div className="add-child-div">
                            <label>Father's Name:</label>
                            <Input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} />
                            {errors.fatherName && <p className="error">{errors.fatherName}</p>}
                        </div>
                        <div className="add-child-div">
                            <label>Phone Number:</label>
                            <Input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </div>
                    </fieldset>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddChild;
