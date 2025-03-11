import React, { useEffect, useState } from "react";
import Header from "./Header";

const Experts = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);
    const [expandedExpertId, setExpandedExpertId] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await fetch(`https://kidcare-a7p0.onrender.com/api/expert`);
                if (!response.ok) {
                    throw new Error("Failed to fetch experts");
                }
                const data = await response.json();
                setExperts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchExperts();
    });

    const toggleDetails = (id) => {
        setExpandedExpertId(expandedExpertId === id ? null : id);
    };

    if (loading) {
        return <p>Loading experts...</p>;
    }

    return (
        <div className="experts-page">
            <Header />
            <header className="header">
                <h1>Meet Our Experts</h1>
            </header>
            <section className="experts-container">
                {experts.map((expert) => (
                    <div className={`expert-card ${expandedExpertId === expert.id ? "expanded" : ""}`} key={expert.id} onClick={() => toggleDetails(expert.id)}>
                        <img src={`https://kidcare-a7p0.onrender.com/public/${expert.image}`} alt={`${expert.name}`}></img>
                        <h2>{expert.name}</h2>
                        <p className="specialty">{expert.specialty}</p>
                        {expandedExpertId === expert.id && (
                            <div className="details">
                                <p className="phone">Phone: {expert.phone}</p>
                                <p className="email">Email: {expert.email}</p>
                                <p className="experience">Experience: {expert.experience}</p>
                                <p className="description">{expert.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Experts;
