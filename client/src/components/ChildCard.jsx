import React from 'react';
import { Link } from 'react-router-dom';

const ChildCard = ({ child }) => {
    return (
        <Link to={`/child/${child._id}`} className="child-card-link">
            <div className="child-card">
                <img src={`http://localhost:8080/public/${child.image}`} alt={child.name} className="child-image" />
                <h2>{child.name}</h2>
            </div>
        </Link>
    );
};

export default ChildCard;
