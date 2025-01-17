import React from 'react';
import { useNavigate } from "react-router-dom";

const ChildCard = ({ child }) => {
    const navigate = useNavigate();

    const handleAddChild = () => {
        navigate(`/childInfo/${child.childID}`);
    };
    
    return (
        <div className="child-card-link" onClick={handleAddChild}>
            <div className="child-card">
                <img src={`http://localhost:8080/public/${child.image}`} alt={child.name} className="child-image" ></img>   
                <h2>{child.name}</h2>
            </div>
        </div>
    );
};
export default ChildCard;
