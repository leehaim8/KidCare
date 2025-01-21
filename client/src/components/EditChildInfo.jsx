import React, { useState } from 'react';

const EditChildDetails = ({ childDetails, onSave, onCancel }) => {
    const [editDetails, setEditDetails] = useState({ ...childDetails });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!editDetails.name) {
            newErrors.name = "Name is required";
        }
        if (!editDetails.age || editDetails.age <= 0) {
            newErrors.age = "Age must be a positive number";
        }
        if (!editDetails.birthday) {
            newErrors.birthday = "Birthday is required";
        }
        if (!editDetails.allergies) {
            newErrors.allergies = "Allergies field cannot be empty";
        }
        if (!editDetails.contactInfo.mother) {
            newErrors['contactInfo.mother'] = "Mother's contact is required";
        }
        if (!editDetails.contactInfo.father) {
            newErrors['contactInfo.father'] = "Father's contact is required";
        }
        if (!editDetails.contactInfo.phone) {
            newErrors['contactInfo.phone'] = "Phone number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('contactInfo.')) {
            const field = name.split('.')[1];
            setEditDetails((prev) => ({
                ...prev,
                contactInfo: {
                    ...prev.contactInfo,
                    [field]: value,
                },
            }));
        } else {
            setEditDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            onSave(editDetails);
        }
    };

    return (
        <div className="edit-child-details">
            <h3>Edit Child Details</h3>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={editDetails.name} onChange={handleInputChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" name="age" value={editDetails.age} onChange={handleInputChange} />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div>
                    <label>Birthday:</label>
                    <input type="date" name="birthday" value={editDetails.birthday} onChange={handleInputChange} />
                    {errors.birthday && <span className="error">{errors.birthday}</span>}
                </div>
                <div>
                    <label>Allergies:</label>
                    <input type="text" name="allergies" value={editDetails.allergies} onChange={handleInputChange} />
                    {errors.allergies && <span className="error">{errors.allergies}</span>}
                </div>
                <div>
                    <label>Mother's Contact:</label>
                    <input type="text" name="contactInfo.mother" value={editDetails.contactInfo.mother} onChange={handleInputChange} />
                    {errors['contactInfo.mother'] && <span className="error">{errors['contactInfo.mother']}</span>}
                </div>
                <div>
                    <label>Father's Contact:</label>
                    <input type="text" name="contactInfo.father" value={editDetails.contactInfo.father} onChange={handleInputChange} />
                    {errors['contactInfo.father'] && <span className="error">{errors['contactInfo.father']}</span>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="contactInfo.phone" value={editDetails.contactInfo.phone} onChange={handleInputChange} />
                    {errors['contactInfo.phone'] && <span className="error">{errors['contactInfo.phone']}</span>}
                </div>
            </form>
            <div className="edit-button">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditChildDetails;
