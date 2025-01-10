import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import Breadcrumbs from "./Breadcrumbs";

function WeeklyFeedback() {
    const [formData, setFormData] = useState({
        childID: "",
        name: "",
        mood: "",
        activities: "",
        health: 5, // Default range value for Physical Health
        socialInteraction: "",
        learningProgress: 5, // Default range value for Learning Progress
        notes: ""
    });
    const [childrens, setChildrens] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchChildren() {
            const userID = localStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:8080/api/children/${userID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setChildrens(data);
                } else {
                    const errorData = await response.json();
                    alert(`Failed to fetch children: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error fetching children:", error);
                alert("An error occurred while fetching children. Please try again.");
            }
        }

        fetchChildren();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Handle the child select separately to extract both name and ID
        if (name === "child") {
            const { name: childName, id: childID } = JSON.parse(value);
            setFormData((prevData) => ({
                ...prevData,
                name: childName,
                childID
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userID = localStorage.getItem("token");
        if (formData.childID === ""|| formData.name === "") {
            document.getElementById("selectError").style.display = "block";
            return;
        }
        if (!formData.mood || !formData.activities || !formData.socialInteraction) {
            document.getElementById("inputError").style.display = "block";
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/weekFeedBack/${userID}/addFeedback`, {
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
                alert(`Submit feedback failed: ${errorData.message}`);
            }
        } catch (error) {
            alert("An error occurred while submitting feedback. Please try again.");
            console.error(error);
        }
    };

    const renderChildrenOptions = () => {
        return childrens.map((child) => (
            <option
                key={child._id}
                value={JSON.stringify({ name: child.name, id: child._id })} // Store name and ID as a JSON string
            >
                {child.name}
            </option>
        ));
    };

    return (
        <div>
            <Header />
            <Breadcrumbs />
            <div className="add-child-container">
                <h1>Weekly Feedback</h1>
                <form className="add-child-week-form" onSubmit={handleSubmit}>
                    <div className="add-child-week-form-div">
                        <label>Choose a child:</label>
                        <select name="child" value={JSON.stringify({ name: formData.name, id: formData.childID })} onChange={handleChange}>
                            <option value={JSON.stringify({name:"",id:""})}>Select a child</option>
                            {renderChildrenOptions()}
                        </select>
                        <span className="errorForm" id="selectError">*please select a child</span>
                    </div>

                    <div className="add-child-week-form-div">
                        <label>Mood/Behavior:</label>
                        <Input
                            type="text"
                            name="mood"
                            placeholder="Describe mood or behavior"
                            value={formData.mood}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-child-week-form-div">
                        <label>Activities/Engagement:</label>
                        <Input
                            type="text"
                            name="activities"
                            placeholder="Describe activities"
                            value={formData.activities}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-child-week-form-div">
                    <label>Physical Health:</label>
    <div className="range-container">
        <span className="range-min">Bad</span>
        <span className="range-value">{formData.health}</span>
        <span className="range-max">Good</span>
    <input
        type="range"
        name="health"
        min="0"
        max="10"
        value={formData.health}
        onChange={handleChange}
        className="range-slider"
    />
    </div>
</div>
                    <div className="add-child-week-form-div">
                        <label>Social Interaction:</label>
                        <Input
                            type="text"
                            name="socialInteraction"
                            placeholder="Describe social interaction"
                            value={formData.socialInteraction}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-child-week-form-div">
    <label>Learning Progress:</label>
    <div className="range-container">
        <span className="range-min">0</span>
        <span className="range-value">{formData.learningProgress}</span>
        <span className="range-max">10</span>
    <input
        type="range"
        name="learningProgress"
        min="0"
        max="10"
        value={formData.learningProgress}
        onChange={handleChange}
        className="range-slider"
    />
    </div>
</div>
                    <div className="add-child-week-form-div">
                        <label>Notes:</label>
                        <input
                            className="notes"
                            type="text"
                            name="notes"
                            placeholder="Add notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="errorForm" id="inputError">*Please fill out the entire form </span>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
}

export default WeeklyFeedback;

