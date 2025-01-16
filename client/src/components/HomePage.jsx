import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChildCard from "./ChildCard";
import { useNavigate } from "react-router-dom";
import BirthdayModal from "./BirthdayModel";

function Home() {
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayMessage, setBirthdayMessage] = useState("");
  const userId = localStorage.getItem("token");
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

    const checkBirthdays = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/children/birthday/${userId}`);
        const data = await response.json();
        if (data.birthdays && data.birthdays.length > 0) {
          setBirthdayMessage(`Today is the birthday of: ${data.birthdays.map(b => b.name).join(", ")}.`);

          const isModalShown = localStorage.getItem("birthdayModalShown");
          if (!isModalShown) {
            setIsModalOpen(true);
            localStorage.setItem("birthdayModalShown", "true");
          }
        }
      } catch (error) {
        console.error("Error checking birthdays:", error);
      }
    };

    fetchChildren();
    checkBirthdays();
  }, [userId]);

  const handleAddChild = () => {
    navigate("/addChild");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="children-cards">
        {children.map((child) => (
          <ChildCard key={child.childID} child={child} />
        ))}
        <div className="child-card add-child" onClick={handleAddChild}>
          <div className="add-child-icon">+</div>
        </div>
      </div>
      {isModalOpen && (<BirthdayModal birthdayMessage={birthdayMessage} onClose={closeModal} />)}
    </div>
  );
}

export default Home;
