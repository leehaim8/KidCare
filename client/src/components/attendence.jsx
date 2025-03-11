import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChildAttendenceCard from "./childAttendenceCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Attendance() {
  const [children, setChildren] = useState([]);
  const [presentChildren, setPresentChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const userId = localStorage.getItem("token");

  // Get today's date
  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch(
          `https://kidcare-a7p0.onrender.com/api/children/${userId}`
        );
        const data = await response.json();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, [userId]);

  const toggleAttendance = (child) => {
    if (presentChildren.some((present) => present.name === child.name)) {
      // If already in present cube, remove it
      setPresentChildren(
        presentChildren.filter((present) => present.name !== child.name)
      );
    } else {
      // Add to present cube and remove from remaining children
      setPresentChildren([...presentChildren, child]);
    }
  };

  const remainingChildren = children.filter(
    (child) => !presentChildren.some((present) => present.name === child.name)
  );

  const filteredChildren = remainingChildren.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitAttendance = async () => {
    const todayDate = new Date().toISOString().split("T")[0];

    const attendance = children.map((child) => ({
      name: child.name,
      status: presentChildren.some((present) => present.name === child.name)
        ? "present"
        : "not present",
      date: todayDate,
    }));

    try {
      const response = await fetch(`https://kidcare-a7p0.onrender.com/api/attendance/${userId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance }),
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

  const fetchHistory = async () => {
    if (!selectedDate) return;

    try {
      const response = await fetch(
        `https://kidcare-a7p0.onrender.com/api/attendance/${userId}/history?date=${selectedDate}`
      );

      if (response.ok) {
        const data = await response.json();
        setHistoryData(data);
      } else {
        setHistoryData([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("An error occurred while fetching history.");
    }
  };

  return (
    <div className="attendance-page">
      <Header />
      <h1 className="attendance-h1">Child Attendance</h1>

      {/* Search Input */}
      <div className="search-bar-container">
  <input
    type="text"
    placeholder="Search children..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
  <Button
    variant="contained"
    color="primary"
    onClick={() => setIsModalOpen(true)}
    className="history-btn"
  >
    History
  </Button>
</div>



      <div className="attendance-container">
        {/* Remaining Child Cards */}
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
        <div className="present-area">
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitAttendance}
          >
            Submit Attendance
          </Button>
        </div>
      </div>

      {/* History Modal */}
<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <Box className="modal-box">
    <Typography variant="h6">Attendance History</Typography>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={fetchHistory}
      style={{ margin: "10px" }}
    >
      Fetch History
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => setIsModalOpen(false)}
    >
      Close
    </Button>
    {historyData.length > 0 ? (
      <ul className="history-list">
        {historyData.map((entry) => (
          <li key={entry.name}>
            {entry.name} - {entry.status}
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ color: "red", marginTop: "10px" }}>No data available for the selected date.</p>
    )}
  </Box>
</Modal>

    </div>
  );
}

export default Attendance;
