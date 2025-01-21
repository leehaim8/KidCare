import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Header from './Header';
import WeeklyFeedbackChildPage from './WeeklyFeedbackChildPage';
import EditChildInfo from './EditChildInfo';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChildInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathSegments = location.pathname.split('/');
    const childID = pathSegments[pathSegments.length - 1];

    const [childDetails, setChildDetails] = useState(null);
    const [weekFeedback, setWeekFeedback] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchChildDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/children/childDetails/${childID}`);
                if (!response.ok) {
                    throw new Error('Error fetching child details');
                }
                const data = await response.json();
                setChildDetails(data.childDetails);
                setWeekFeedback(data.weekFeedback);
            } catch (error) {
                console.error('Error fetching child details:', error);
            }
        };

        fetchChildDetails();
    }, [childID]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/children/${childID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting child');
            }
            navigate("/HomePage");
        } catch (error) {
            console.error('Error deleting child:', error);
        }
    };

    const handleSaveEdit = async (updatedDetails) => {
        try {
            const response = await fetch(`http://localhost:8080/api/children/${childID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });
            if (!response.ok) {
                throw new Error('Error updating child details');
            }
            const updatedChild = await response.json();
            setChildDetails(updatedChild);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating child details:', error);
        }
    };

    if (!childDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const learningProgressData = {
        labels: weekFeedback.map((feedback) => formatDate(feedback.Date)),
        datasets: [
            {
                label: 'Learning Progress',
                data: weekFeedback.map((feedback) => feedback.learningProgress),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const healthData = {
        labels: weekFeedback.map((feedback) => formatDate(feedback.Date)),
        datasets: [
            {
                label: 'Health Rating',
                data: weekFeedback.map((feedback) => feedback.health),
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <Header />
            <div className="child-info-container">
                {isEditing ? (
                    <EditChildInfo childDetails={childDetails} onSave={handleSaveEdit} onCancel={() => setIsEditing(false)} />
                ) : (
                    <>
                        <div className="child-info-container-div">
                            <button onClick={() => setIsEditing(true)} className="child-info-container-button"><FiEdit /></button>
                            <button onClick={handleDelete} className="child-info-container-button"><RiDeleteBinLine /></button>
                        </div>
                        <div className="child-info-card">
                            <div className="child-info-header">
                                <h2>{childDetails.name}</h2>
                                <img src={`http://localhost:8080/public/${childDetails.image}`} alt={`${childDetails.name}`} className="child-image" />
                            </div>
                            <div className="child-info-details">
                                <p><strong>Age:</strong> {childDetails.age}</p>
                                <p><strong>Birthday:</strong> {childDetails.birthday}</p>
                                <p><strong>Allergies:</strong> {childDetails.allergies.join(', ')}</p>
                                <p><strong>Mother's Contact:</strong> {childDetails.contactInfo.mother}</p>
                                <p><strong>Father's Contact:</strong> {childDetails.contactInfo.father}</p>
                                <p><strong>Phone:</strong> {childDetails.contactInfo.phone}</p>
                            </div>
                        </div>
                        <WeeklyFeedbackChildPage weekFeedback={weekFeedback} />
                        <div className="charts-container">
                            <div className="chart">
                                <h3>Learning Progress</h3>
                                <Line data={learningProgressData} />
                            </div>
                            <div className="chart">
                                <h3>Health Rating</h3>
                                <Line data={healthData} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChildInfo;
