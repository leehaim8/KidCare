import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const allergiesList = ["Peanuts", "Milk", "Fish", "Eggs", "Soy"];

const AddChild = () => {
  const userId = localStorage.getItem("token");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      age: "",
      allergies: [],
      moreAllergies: "", // Added for custom allergies
      motherName: "",
      fatherName: "",
      phone: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Child's name is required"),
      birthday: Yup.date().required("Child's birthday is required"),
      age: Yup.number()
        .positive("Age must be a positive number")
        .required("Child's age is required"),
      motherName: Yup.string().required("Mother's name is required"),
      fatherName: Yup.string().required("Father's name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      gender: Yup.string().required("Please select a gender"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          `https://kidcare-a7p0.onrender.com/api/children/${userId}/addChild`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          alert("Child added successfully!");
          resetForm();
          navigate("/HomePage"); // Navigate to HomePage on success
        } else {
          const errorData = await response.json();
          alert(`Failed to add child: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error adding child:", error);
        alert("An error occurred. Please try again.");
      }
    },
  });

  const handleAllergyChange = (event) => {
    const { value, checked } = event.target;
    const { allergies } = formik.values;
    if (checked) {
      formik.setFieldValue("allergies", [...allergies, value]);
    } else {
      formik.setFieldValue(
        "allergies",
        allergies.filter((allergy) => allergy !== value)
      );
    }
  };

  return (
    <div className="add-child-page">
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "130px 0" }}
      >
        <Card sx={{ padding: 4, width: "90%", maxWidth: 800 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add a Child
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {/* Child's Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Child's Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              {/* Birthday */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Birthday"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputLabelProps={{ shrink: true }}
                  error={
                    formik.touched.birthday && Boolean(formik.errors.birthday)
                  }
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>

              {/* Age */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Child's Age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>

              {/* Allergies */}
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <Typography variant="subtitle1" gutterBottom>
                    Allergies:
                  </Typography>
                  <FormGroup row>
                    {allergiesList.map((allergy) => (
                      <FormControlLabel
                        key={allergy}
                        control={
                          <Checkbox
                            value={allergy}
                            checked={formik.values.allergies.includes(allergy)}
                            onChange={handleAllergyChange}
                          />
                        }
                        label={allergy}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              {/* More Allergies */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="More Allergies"
                  name="moreAllergies"
                  placeholder="Enter additional allergies (optional)"
                  value={formik.values.moreAllergies}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Mother's Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  name="motherName"
                  value={formik.values.motherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.motherName &&
                    Boolean(formik.errors.motherName)
                  }
                  helperText={
                    formik.touched.motherName && formik.errors.motherName
                  }
                />
              </Grid>

              {/* Father's Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fatherName"
                  value={formik.values.fatherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.fatherName &&
                    Boolean(formik.errors.fatherName)
                  }
                  helperText={
                    formik.touched.fatherName && formik.errors.fatherName
                  }
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default AddChild;
