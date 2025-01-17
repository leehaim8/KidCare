import React from 'react';
import { useNavigate } from "react-router-dom";
import BasicModal from './basicModal';

const ChildCard = ({ child }) => {
    const navigate = useNavigate();

    const handleAddChild = () => {
        navigate(`/childInfo/${child.childID}`);
    };
    
    return (
        <div className="child-card-link">
            <div className="child-card">
            <div onClick={handleAddChild}>
                <img src={`http://localhost:8080/public/${child.image}`} alt={child.name} className="child-image" ></img>   
                <h2>{child.name}</h2>
            </div>
            <BasicModal child={child} />
            </div>
        </div>
    );
};
export default ChildCard;
