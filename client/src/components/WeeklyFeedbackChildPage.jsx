import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const WeeklyFeedback = ({ weekFeedback }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const handleToggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleFillFeedback = () => {
        navigate('/WeeklyFeedback');
    };

    return (
        <div className="weekly-feedback-container">
            <div className="weekly-feedback-header">
                <h3>Weekly Feedback</h3>
                <button onClick={handleFillFeedback} className="fill-feedback-btn">
                    Add Weekly Feedback
                </button>
            </div>
            {weekFeedback.map((feedback, index) => (
                <div
                    key={index}
                    className={`feedback-card ${expandedIndex === index ? 'expanded' : ''}`}
                    onClick={() => handleToggleExpand(index)}
                >
                    <div className="card-header">
                        <h4>{formatDate(feedback.Date)}</h4>
                        <div className="mood-icon">
                            {feedback.mood === 'Happy' ? (
                                <span role="img" aria-label="happy" style={{ color: 'green' }}>
                                    😊
                                </span>
                            ) : (
                                <span role="img" aria-label="sad" style={{ color: 'red' }}>
                                    😞
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={`card-body ${expandedIndex === index ? 'show' : ''}`}>
                        <p><strong>Activities:</strong> {feedback.activities.join(', ')}</p>
                        <p><strong>Social Interaction:</strong> <span role="img" aria-label="group">👫</span> {feedback.socialInteraction}</p>
                        <p><strong>Notes:</strong> {feedback.notes}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeeklyFeedback;
