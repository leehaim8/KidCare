import React, { useState } from 'react';

const EditChildDetails = ({ childDetails, onSave, onCancel }) => {
    const [editDetails, setEditDetails] = useState({ ...childDetails });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        onSave(editDetails);
    };

    return (
        <div className="edit-child-details">
            <h3>Edit Child Details</h3>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={editDetails.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" name="age" value={editDetails.age} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Birthday:</label>
                    <input type="date" name="birthday" value={editDetails.birthday} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Allergies:</label>
                    <input type="text" name="allergies" value={editDetails.allergies} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Mother's Contact:</label>
                    <input type="text" name="contactInfo.mother" value={editDetails.contactInfo.mother} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Father's Contact:</label>
                    <input type="text" name="contactInfo.father" value={editDetails.contactInfo.father} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="contactInfo.phone" value={editDetails.contactInfo.phone} onChange={handleInputChange} />
                </div>
            </form>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditChildDetails;
