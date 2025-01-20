import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChildAttendenceCard from "./childAttendenceCard";

function Attendance() {
  const [children, setChildren] = useState([]);
  const [presentChildren, setPresentChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const userId = localStorage.getItem("token");

  // Get today's date
  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options); // Format: January 1, 2023
  };

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/children/${userId}`
        );
        const data = await response.json();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, [userId]);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY / 5; // Adjust multiplier for movement
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAttendance = (child) => {
    if (presentChildren.some((present) => present.name === child.name)) {
      setPresentChildren(presentChildren.filter((present) => present.name !== child.name));
    } else {
      setPresentChildren([...presentChildren, child]);
    }
  };

  const remainingChildren = children.filter(
    (child) => !presentChildren.some((present) => present.name === child.name)
  );

  const filteredChildren = remainingChildren.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
  );
  const handleSubmitAttendance = async () => {
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in ISO format (YYYY-MM-DD)
  
    // Prepare attendance data
    const attendance = children.map((child) => ({
      name: child.name,
      status: presentChildren.some((present) => present.name === child.name)
        ? "present"
        : "not present",
      date: todayDate,
    }));
  
    try {
      // Send data to the backend
      const response = await fetch(`http://localhost:8080/api/attendance/${userId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance }), // Send attendance array to backend
      });
  
      if (response.ok) {
        alert("Attendance has been submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit attendance: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("An error occurred while submitting attendance. Please try again.");
    }
  };
  
  

  return (
    <div className="attendance-page">
      <Header />
      <h1 className="attendence-h1">Child Attendance</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search children..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input attendance-search"
        />
      </div>
      <div className="attendance-container">

        {/* Child Cards */}
        <div className="children-cards">
          {filteredChildren.map((child) => (
            <div
              key={child.name}
              className="child-card-wrapper"
              onClick={() => toggleAttendance(child)}
            >
              <ChildAttendenceCard child={child} />
            </div>
          ))}
        </div>

        {/* Present Area */}
        <div
          className="present-area"
          style={{ "--scroll-offset": `${scrollOffset}px` }}
        >
          <h2>Present - {getCurrentDate()}</h2>
          <div className="present-children">
            {presentChildren.map((child) => (
              <div
                key={child.name}
                className="child-card-link present"
                onClick={() => toggleAttendance(child)}
              >
                <ChildAttendenceCard child={child} />
              </div>
            ))}
          </div>
          <button onClick={handleSubmitAttendance} className="submit-button">
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
