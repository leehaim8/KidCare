import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChildCard from "./ChildCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [children, setChildren] = useState([]);
  const userId = localStorage.getItem("token");
  console.log(userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/children/${userId}`);
        const data = await response.json();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, [userId]);

  const handleAddChild = () => {
    navigate("/add-child");
  };

  return (
    <div>
      <Header />
      <div className="children-cards">
        {children.map((child) => (
          <ChildCard key={child._id} child={child} />
        ))}
        <div className="child-card add-child" onClick={handleAddChild}>
          <div className="add-child-icon">+</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
