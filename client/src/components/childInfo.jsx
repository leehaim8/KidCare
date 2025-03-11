import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'; // Import Recharts components
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
    const [periodicFeedback, setPeriodicFeedback] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showWeeklyFeedback, setShowWeeklyFeedback] = useState(true); // Toggle state

    useEffect(() => {
        const fetchChildDetails = async () => {
            try {
                const response = await fetch(`https://kidcare-a7p0.onrender.com/api/children/childDetails/${childID}`);
                if (!response.ok) {
                    throw new Error('Error fetching child details');
                }
                const data = await response.json();
                setChildDetails(data.childDetails);
                setWeekFeedback(data.weekFeedback);
                setPeriodicFeedback(data.periodicFeedback); 
            } catch (error) {
                console.error('Error fetching child details:', error);
            }
        };

        fetchChildDetails();
    }, [childID]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://kidcare-a7p0.onrender.com/api/children/${childID}`, {
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
            const response = await fetch(`https://kidcare-a7p0.onrender.com/api/children/${childID}`, {
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
            setChildDetails({ ...updatedChild.child });
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

    // Weekly feedback graph data
    const weeklyLearningProgressData = {
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

    const weeklyHealthData = {
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
    // Function to map string values ("low", "moderate", "high") to emojis
    const mapToEmoji = (value) => {
        const emojiMap = {
            low: { label: "Low", icon: <span>🙁</span> },
            moderate: { label: "Moderate", icon: <span>🙂</span> },
            high: { label: "High", icon: <span>😃</span> },
        };
        return emojiMap[value] || { label: "No Data", icon: <span>❓</span> };
    };
// Function to extract month name from date
const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" });
};

// Group periodic feedback by month & calculate average scores
const monthlyData = {};
periodicFeedback.forEach((feedback) => {
    const month = getMonthName(feedback.date);

    if (!monthlyData[month]) {
        monthlyData[month] = { count: 0, energyLevel: 0, mood: 0 };
    }

    monthlyData[month].energyLevel += feedback.energyLevel;
    monthlyData[month].mood += feedback.mood;
    monthlyData[month].count += 1;
});

// Convert aggregated monthly data into an array
const generalWellBeingData = Object.keys(monthlyData).map((month) => ({
    month,
    energyLevel: Math.round(monthlyData[month].energyLevel / monthlyData[month].count),
    mood: Math.round(monthlyData[month].mood / monthlyData[month].count),
}));



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
                                <img src={`https://kidcare-a7p0.onrender.com/public/${childDetails.image}`} alt={`${childDetails.name}`} className="child-image" />
                            </div>
                        </div>

                        <WeeklyFeedbackChildPage weekFeedback={weekFeedback} />

                        {/* Toggle Button */}
                        <ToggleButtonGroup
                            value={showWeeklyFeedback ? 'weekly' : 'periodic'}
                            exclusive
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setShowWeeklyFeedback(newValue === 'weekly');
                                }
                            }}
                            sx={{ marginBottom: 2 }}
                        >
                            <ToggleButton value="weekly">Weekly Feedback</ToggleButton>
                            <ToggleButton value="periodic">Periodic Feedback</ToggleButton>
                        </ToggleButtonGroup>

                        {/* Display the appropriate graphs */}
                        <div className="charts-container">
                            {showWeeklyFeedback ? (
                                <>
                                    <div className="chart">
                                        <h3>Learning Progress (Weekly)</h3>
                                        <Line data={{
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
                                        }} />
                                    </div>
                                    <div className="chart">
                                        <h3>Health Rating (Weekly)</h3>
                                        <Line data={{
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
                                        }} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className='feedBackH3'>General Well-being</h3>
                                    <div className='radar-chart'>
    <ResponsiveContainer width="100%" height={500}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generalWellBeingData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="month" /> {/* X-Axis: Months */}
            <PolarRadiusAxis domain={[1, 10]} /> {/* Y-Axis: Scores from 1 to 10 */}
            
            {/* Radar components for different well-being factors */}
            <Radar name="Energy Level" dataKey="energyLevel" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Mood" dataKey="mood" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />

            <RechartsTooltip />
        </RadarChart>
    </ResponsiveContainer>
</div>

<h3 className='feedBackH3'>Additional Observations</h3>
<div className="feedback-container">
    {periodicFeedback.map((feedback, index) => (
        <div key={index} className="feedback-row">
            <h4 className='DateFeedBack'>{formatDate(feedback.date)}</h4>
            <p>Sleeping: {feedback.sleepingQuality ? "✅ Sleeps well" : "❌ Does not sleep well"}</p>
            <p>Physical Active: {feedback.physicalActivity ? "✅ Engages in physical activity" : "❌ Does not engage in physical activity"}</p>
            <p>Group Contri: {feedback.groupContribution ? "✅ Actively contributes to group activities" : "❌ Does not contribute to group activities"}</p>
        </div>
    ))}
</div>


                                <h3 className='feedBackH3'>Learning & Participation</h3>
                                <div className="feedback-container">
                                    {periodicFeedback.map((feedback, index) => (
                                <div key={index} className="feedback-row">
                                <h4 className='DateFeedBack'>{formatDate(feedback.date)}</h4>
                                <p><strong>Participation:</strong> {mapToEmoji(feedback.participationLevel).icon} {mapToEmoji(feedback.participationLevel).label}</p>
                                <p><strong>Activity Focus:</strong> {mapToEmoji(feedback.activityFocus).icon} {mapToEmoji(feedback.activityFocus).label}</p>
                                <p><strong>Teamwork:</strong> {mapToEmoji(feedback.teamwork).icon} {mapToEmoji(feedback.teamwork).label}</p>
                                <p><strong>Self Initiative:</strong> {mapToEmoji(feedback.selfInitiative).icon} {mapToEmoji(feedback.selfInitiative).label}</p>
                                </div>
                             ))}
                        </div>
                        <h3 className='feedBackH3'>Teacher's Observations</h3>
<div className="text-feedback-container">
    {periodicFeedback.map((feedback, index) => (
        <div key={index} className="text-feedback">
            <h4 className='DateFeedBack'>{formatDate(feedback.date)}</h4>
            {feedback.eatingHabits && <p><strong>Eating Habits:</strong> {feedback.eatingHabits}</p>}
            {feedback.emotionalExpression && <p><strong>Emotional Expression:</strong> {feedback.emotionalExpression}</p>}
            {feedback.socialInteraction && <p><strong>Social Interaction:</strong> {feedback.socialInteraction}</p>}
            {feedback.conflictResolution && <p><strong>Conflict Resolution:</strong> {feedback.conflictResolution}</p>}
            {feedback.emotionalGrowth && <p><strong>Emotional Growth:</strong> {feedback.emotionalGrowth}</p>}
            {feedback.specialNotes && <p><strong>Special Notes:</strong> {feedback.specialNotes}</p>}
            {feedback.suggestionsForImprovement && <p><strong>Suggestions for Improvement:</strong> {feedback.suggestionsForImprovement}</p>}
        </div>
    ))}
</div>



                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default ChildInfo;
