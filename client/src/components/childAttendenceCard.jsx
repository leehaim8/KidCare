import React from 'react';

const ChildAttendenceCard = ({ child }) => {

    
    return (
        <div className="child-card-link">
            <div className="child-card">
            <div>
                <img src={`http://localhost:8080/public/${child.image}`} alt={child.name} className="child-image" ></img>   
                <h2>{child.name}</h2>
            </div>
            </div>
        </div>
    );
};
export default ChildAttendenceCard;
