import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Button,
  Card,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function WeeklyFeedback() {
  const [formData, setFormData] = useState({
    childID: "",
    name: "",
    mood: "",
    activities: "",
    date: "",
    health: 5,
    socialInteraction: "",
    learningProgress: 5,
    notes: "",
  });
  const [childrens, setChildrens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChildren() {
      const userID = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/children/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChildrens(data);
        } else {
          const errorData = await response.json();
          alert(`Failed to fetch children: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error fetching children:", error);
        alert("An error occurred while fetching children. Please try again.");
      }
    }

    fetchChildren();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "child") {
      const { name: childName, id: childID } = JSON.parse(value);
      setFormData((prevData) => ({
        ...prevData,
        name: childName,
        childID,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("token");
    if (formData.childID === "" || formData.name === "") {
      alert("Please select a child");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/weekFeedBack/${userID}/addFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/HomePage");
      } else {
        const errorData = await response.json();
        alert(`Submit feedback failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting feedback. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box className="weekly-feedback-container-form">
      <Header />
      <Card className="weekly-feedback-card">
        <Typography variant="h4" className="weekly-feedback-title">
          Weekly Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Choose a child</InputLabel>
                <Select
                  name="child"
                  value={JSON.stringify({
                    name: formData.name,
                    id: formData.childID,
                  })}
                  onChange={handleChange}
                >
                  <MenuItem value={JSON.stringify({ name: "", id: "" })}>
                    Select a child
                  </MenuItem>
                  {childrens.map((child) => (
                    <MenuItem
                      key={child._id}
                      value={JSON.stringify({
                        name: child.name,
                        id: child._id,
                      })}
                    >
                      {child.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="date"
                label="Date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="mood"
                label="Mood/Behavior"
                placeholder="Describe mood or behavior"
                value={formData.mood}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="activities"
                label="Activities/Engagement"
                placeholder="Describe activities"
                value={formData.activities}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Physical Health</Typography>
              <Slider
                name="health"
                value={formData.health}
                onChange={(e, value) =>
                  setFormData((prev) => ({ ...prev, health: value }))
                }
                min={0}
                max={10}
                valueLabelDisplay="auto"
                className="range-slider-container"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="socialInteraction"
                label="Social Interaction"
                placeholder="Describe social interaction"
                value={formData.socialInteraction}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Learning Progress</Typography>
              <Slider
                name="learningProgress"
                value={formData.learningProgress}
                onChange={(e, value) =>
                  setFormData((prev) => ({ ...prev, learningProgress: value }))
                }
                min={0}
                max={10}
                valueLabelDisplay="auto"
                className="range-slider-container"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="notes"
                label="Notes"
                placeholder="Add notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} className="week-submit-button">
              <Button type="submit" variant="contained" color="primary">
                Submit Feedback
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default WeeklyFeedback;
