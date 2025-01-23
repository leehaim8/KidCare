import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    Grid,
    CircularProgress,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import Header from "./Header";
import { object, string, number, boolean } from "yup";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function PeriodicFeedback() {
    const initialValues = {
    // Child Selection
    childDeatails:"",

    // General Well-being
    energyLevel: 3,
    eatingHabits: "",
    sleepingQuality: false,
    physicalActivity: false,
    mood: 3,
    emotionalExpression: "",
    socialInteraction: "",
    groupContribution: false,
    conflictResolution: "",
    feelsSafe: false,
    asksForHelp: false,
    generalNotes: "",

    // Learning & Participation
    participationLevel: "",
    activityFocus: "",
    teamwork: "",
    selfInitiative: "",
    fineMotorSkills: "",
    grossMotorSkills: "",
    cognitiveSkills: "",
    emotionalGrowth: "",
    participationNotes: "",

    // Additional Feedback
    specialNotes: "",
    suggestionsForImprovement: "",
    overallSatisfaction: "",
    meetingRequest: false,
    };
    const [childrens, setChildrens] = useState([]);

    useEffect(() => {
        async function fetchChildren() {
            const userID = localStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:8080/api/children/${userID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
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

    const navigate = useNavigate();
    const handleSubmit = async (values, helpers) => {
        console.log(values);
        const userID = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/periodicFeedback/${userID}/addPeriodicFeedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values, userID }),
            });
            if (response.ok) {
                alert("Feedback submitted successfully!");
                helpers.resetForm();
                navigate("/HomePage");
            } else {
                const errorData = await response.json();
                alert(`Failed to submit feedback: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback. Please try again.");
        }
    };

    return (
        <div className="Periodic-container">
            <Header />
            <Card>
                <CardHeader title="Periodic Feedback" />
                <CardContent>
                    <FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
                        <FormikStep label="Select Child">
                            <Box paddingBottom={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="child-select-label">Select a Child</InputLabel>
                                    <Field name="childDeatails" as={Select} labelId="child-select-label" fullWidth>
                                        <MenuItem value=""><em>Select a child</em></MenuItem>
                                        {childrens.map((child) => (
                                            <MenuItem key={child._id} value={JSON.stringify({ id: child._id, name: child.name })}>{child.name}</MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Box>
                        </FormikStep>
                        <FormikStep
    label="General Well-being"
    validationSchema={object({
        energyLevel: number()
            .required("Energy level is required")
            .min(0, "Minimum value is 0")
            .max(5, "Maximum value is 5"),
        eatingHabits: string()
            .required("Eating habits description is required")
            .max(500, "Description is too long (max 500 characters)"),
        sleepingQuality: boolean()
            .required("Sleeping quality assessment is required"),
        physicalActivity: boolean()
            .required("Please select if the child engages in physical activity"),
        mood: number()
            .required("Mood level is required")
            .min(0, "Minimum value is 0")
            .max(5, "Maximum value is 5"),
        emotionalExpression: string()
            .required("Emotional expression feedback is required")
            .max(500, "Description is too long (max 500 characters)"),
        socialInteraction: string()
            .required("Social interaction feedback is required")
            .max(500, "Description is too long (max 500 characters)"),
        groupContribution: boolean()
            .required("Group contribution selection is required"),
        conflictResolution: string()
            .required("Conflict resolution feedback is required")
            .max(500, "Description is too long (max 500 characters)"),
        feelsSafe: boolean()
            .required("Please indicate if the child feels safe"),
        asksForHelp: boolean()
            .required("Please indicate if the child asks for help"),
        generalNotes: string()
            .max(1000, "Notes are too long (max 1000 characters)"),
    })}
    
>
    {/* Physical Well-being */}
    <Box className="periodic-box">
        <Typography variant="h6">Physical Well-being</Typography>
        <Field name="energyLevel">
            {({ field, form }) => (
                <div className="range-container">
                    <Typography variant="body2">Energy Level: <strong>{field.value}</strong></Typography>
                    <input
                        {...field}
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        onChange={(e) => form.setFieldValue("energyLevel", e.target.value)}
                        className="Field-style"
                    />
                </div>
            )}
        </Field>
        <Field
    name="eatingHabits"
    component={TextField}
    label="Describe the child's eating habits (e.g., finishes meals, picky eater, needs assistance):"
    fullWidth
    className="Field-style"
    multiline
    rows={3}
/>

<div className="toggle-container">
    <Typography variant="body1" className="toggle-label">
        Does the child sleep well at night?
    </Typography>
    <Field name="sleepingQuality">
        {({ field, form }) => (
            <ToggleButtonGroup
                value={field.value ? "yes" : "no"}
                exclusive
                onChange={(e, value) => {
                    if (value !== null) {
                        form.setFieldValue("sleepingQuality", value === "yes");
                    }
                }}
                aria-label="sleepingQuality"
                className="toggle-group"
            >
                <ToggleButton value="yes" aria-label="Yes">
                    Yes
                </ToggleButton>
                <ToggleButton value="no" aria-label="No">
                    No
                </ToggleButton>
            </ToggleButtonGroup>
        )}
    </Field>
</div>
<div className="toggle-container">
    <Typography variant="body1" className="toggle-label">
        Does the child engage in physical activity?
    </Typography>
    <Field name="physicalActivity">
        {({ field, form }) => (
            <ToggleButtonGroup
                value={field.value ? "yes" : "no"}
                exclusive
                onChange={(e, value) => {
                    if (value !== null) {
                        form.setFieldValue("physicalActivity", value === "yes");
                    }
                }}
                aria-label="Physical Activity"
                className="toggle-group"
            >
                <ToggleButton value="yes" aria-label="Yes">
                    Yes
                </ToggleButton>
                <ToggleButton value="no" aria-label="No">
                    No
                </ToggleButton>
            </ToggleButtonGroup>
        )}
    </Field>
</div>
</Box>

{/* Emotional Well-being */}
<Box className="periodic-box">
    <Typography variant="h6">Emotional Well-being</Typography>
    <Field name="mood">
        {({ field, form }) => (
            <div className="range-container">
                <Typography variant="body2">
                    Overall Mood: <strong>{field.value}</strong>
                </Typography>
                <input
                    {...field}
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    onChange={(e) => form.setFieldValue("mood", e.target.value)}
                    className="Field-style"
                />
            </div>
        )}
    </Field>
    <Field
        name="emotionalExpression"
        component={TextField}
        label="How does the child express emotions (e.g., crying, verbalizing)?"
        fullWidth
        className="Field-style"
        multiline
        rows={3}
    />
</Box>

{/* Social Well-being */}
<Box className="periodic-box">
    <Typography variant="h6">Social Well-being</Typography>
    <Field
        name="socialInteraction"
        component={TextField}
        label="Describe how the child interacts with peers (e.g., collaborative, shy, etc.):"
        fullWidth
        className="Field-style"
        multiline
        rows={3}
    />
    <Field name="groupContribution">
        {({ field, form }) => (
            <div className="toggle-container">
                <Typography variant="body1" className="toggle-label">
                    Does the child actively contribute during group activities?
                </Typography>
                <ToggleButtonGroup
                    value={field.value ? "yes" : "no"}
                    exclusive
                    onChange={(e, value) => {
                        if (value !== null) {
                            form.setFieldValue("groupContribution", value === "yes");
                        }
                    }}
                    aria-label="Group Contribution"
                    className="toggle-group"
                >
                    <ToggleButton value="yes" aria-label="Yes">
                        Yes
                    </ToggleButton>
                    <ToggleButton value="no" aria-label="No">
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )}
    </Field>
    <Field
        name="conflictResolution"
        component={TextField}
        label="How does the child resolve conflicts with peers?"
        fullWidth
        className="Field-style"
        multiline
        rows={3}
    />
</Box>

{/* Comfort & Safety */}
<Box className="periodic-box">
    <Typography variant="h6">Comfort & Safety</Typography>
    <Field name="feelsSafe">
        {({ field, form }) => (
            <div className="toggle-container">
                <Typography variant="body1" className="toggle-label">
                    Does the child feel safe and secure in the classroom?
                </Typography>
                <ToggleButtonGroup
                    value={field.value ? "yes" : "no"}
                    exclusive
                    onChange={(e, value) => {
                        if (value !== null) {
                            form.setFieldValue("feelsSafe", value === "yes");
                        }
                    }}
                    aria-label="Feels Safe"
                    className="toggle-group"
                >
                    <ToggleButton value="yes" aria-label="Yes">
                        Yes
                    </ToggleButton>
                    <ToggleButton value="no" aria-label="No">
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )}
    </Field>
    <Field name="asksForHelp">
        {({ field, form }) => (
            <div className="toggle-container">
                <Typography variant="body1" className="toggle-label">
                    Does the child ask for help when needed?
                </Typography>
                <ToggleButtonGroup
                    value={field.value ? "yes" : "no"}
                    exclusive
                    onChange={(e, value) => {
                        if (value !== null) {
                            form.setFieldValue("asksForHelp", value === "yes");
                        }
                    }}
                    aria-label="Asks for Help"
                    className="toggle-group"
                >
                    <ToggleButton value="yes" aria-label="Yes">
                        Yes
                    </ToggleButton>
                    <ToggleButton value="no" aria-label="No">
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )}
    </Field>
    <Field
        name="generalNotes"
        component={TextField}
        label="Additional notes about the child's comfort or needs:"
        multiline
        rows={3}
        fullWidth
        className="Field-style"
    />
</Box>

</FormikStep>


<FormikStep
    label="Learning & Participation"
    validationSchema={object({
        participationLevel: string()
        .required("Participation level selection is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    activityFocus: string()
        .required("Activity focus level is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    teamwork: string()
        .required("Teamwork feedback is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    selfInitiative: string()
        .required("Self-initiative feedback is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    fineMotorSkills: string()
        .required("Fine motor skills assessment is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    grossMotorSkills: string()
        .required("Gross motor skills assessment is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    cognitiveSkills: string()
        .required("Cognitive skills assessment is required")
        .oneOf(["low", "moderate", "high"], "Invalid selection"),
    emotionalGrowth: string()
        .required("Emotional growth feedback is required")
        .max(500, "Description is too long (max 500 characters)"),
    participationNotes: string()
        .max(1000, "Notes are too long (max 1000 characters)"),
    })}
>
    <Box className="periodic-box">
        <Typography variant="h6">Learning & Participation</Typography>

        {/* Participation Level */}
        <Typography variant="body1" className="step-description">
            How actively does the child participate in group activities?
        </Typography>
        <Field name="participationLevel">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Low", icon: <span>🙁</span>, value: "low" },
                        { label: "Moderate", icon: <span>🙂</span>, value: "moderate" },
                        { label: "High", icon: <span>😃</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("participationLevel", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Focus Level */}
        <Typography variant="body1" className="step-description">
            How well does the child stay focused during activities?
        </Typography>
        <Field name="activityFocus">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Easily Distracted", icon: <span>📉</span>, value: "low" },
                        { label: "Some Focus", icon: <span>📊</span>, value: "moderate" },
                        { label: "Fully Focused", icon: <span>📈</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("activityFocus", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Teamwork Assessment */}
        <Typography variant="body1" className="step-description">
            How well does the child collaborate with peers?
        </Typography>
        <Field name="teamwork">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Struggles", icon: <span>👎</span>, value: "low" },
                        { label: "Average", icon: <span>👍</span>, value: "moderate" },
                        { label: "Excellent", icon: <span>👏</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("teamwork", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Self-Initiative */}
        <Typography variant="body1" className="step-description">
            How often does the child show self-initiative in activities?
        </Typography>
        <Field name="selfInitiative">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Rarely", icon: <span>🔴</span>, value: "low" },
                        { label: "Sometimes", icon: <span>🟠</span>, value: "moderate" },
                        { label: "Frequently", icon: <span>🟢</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("selfInitiative", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Fine Motor Skills */}
        <Typography variant="body1" className="step-description">
            Rate the child's fine motor skills (e.g., writing, drawing, handling objects):
        </Typography>
        <Field name="fineMotorSkills">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Needs Improvement", icon: <span>🖍️</span>, value: "low" },
                        { label: "Developing", icon: <span>✏️</span>, value: "moderate" },
                        { label: "Excellent", icon: <span>🖌️</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("fineMotorSkills", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Gross Motor Skills */}
        <Typography variant="body1" className="step-description">
            Rate the child's gross motor skills (e.g., running, climbing, coordination):
        </Typography>
        <Field name="grossMotorSkills">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Needs Improvement", icon: <span>🏃</span>, value: "low" },
                        { label: "Developing", icon: <span>🤸</span>, value: "moderate" },
                        { label: "Excellent", icon: <span>🏋️</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("grossMotorSkills", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Cognitive Skills */}
        <Typography variant="body1" className="step-description">
            Rate the child's cognitive skills (e.g., problem-solving, memory):
        </Typography>
        <Field name="cognitiveSkills">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Needs Improvement", icon: <span>🧩</span>, value: "low" },
                        { label: "Developing", icon: <span>🔎</span>, value: "moderate" },
                        { label: "Excellent", icon: <span>🧠</span>, value: "high" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("cognitiveSkills", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Emotional Growth */}
        <Typography variant="body1" className="step-description">
            Assess the child's emotional growth (e.g., expressing feelings, managing emotions):
        </Typography>
        <Field name="emotionalGrowth" component={TextField} fullWidth multiline rows={3} className="Field-style" />

        {/* Additional Notes */}
        <Field
            name="participationNotes"
            component={TextField}
            label="Additional notes about the child's learning and participation:"
            fullWidth
            className="Field-style"
            multiline
            rows={4}
        />
    </Box>
</FormikStep>



<FormikStep
    label="Additional Feedback"
    validationSchema={object({
        specialNotes: string()
            .required("Special notes are required")
            .max(1000, "Notes are too long (max 1000 characters)"),
        meetingRequest: boolean().required(
            "Please indicate if a meeting request is needed"
        ),
        suggestionsForImprovement: string()
            .required("Suggestions for improvement are required")
            .max(500, "Suggestions are too long (max 500 characters)"),
        overallSatisfaction: string()
            .required("Overall satisfaction is required")
            .oneOf(
                ["not_satisfied", "neutral", "satisfied", "very_satisfied"],
                "Invalid selection"
            ),
    })}
>
    <Box className="periodic-box">
        <Typography variant="h6">Additional Feedback</Typography>

        {/* Special Notes */}
        <Typography variant="body1" className="step-description">
            Provide any special notes or observations about the child:
        </Typography>
        <Field
            name="specialNotes"
            component={TextField}
            label="Special Notes"
            fullWidth
            className="Field-style"
            multiline
            rows={4}
        />

        {/* Suggestions for Improvement */}
        <Typography variant="body1" className="step-description">
            Are there any areas where the child needs extra support or improvement?
        </Typography>
        <Field
            name="suggestionsForImprovement"
            component={TextField}
            label="Suggestions for Improvement"
            fullWidth
            className="Field-style"
            multiline
            rows={4}
        />

        {/* Overall Satisfaction */}
        <Typography variant="body1" className="step-description">
            How satisfied are you with the child’s overall progress in the kindergarten?
        </Typography>
        <Field name="overallSatisfaction">
            {({ field, form }) => (
                <Box className="icon-container">
                    {[
                        { label: "Not Satisfied", icon: <span>😞</span>, value: "not_satisfied" },
                        { label: "Neutral", icon: <span>😐</span>, value: "neutral" },
                        { label: "Satisfied", icon: <span>😊</span>, value: "satisfied" },
                        { label: "Very Satisfied", icon: <span>🌟</span>, value: "very_satisfied" },
                    ].map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            selected={field.value === option.value}
                            onChange={() => form.setFieldValue("overallSatisfaction", option.value)}
                            className="icon-button"
                        >
                            {option.icon}
                            <Typography variant="body2" className="icon-label">{option.label}</Typography>
                        </ToggleButton>
                    ))}
                </Box>
            )}
        </Field>

        {/* Request Parent Meeting */}
        <Typography variant="body1" className="step-description">
            Would you like to request a parent meeting to discuss the child's progress?
        </Typography>
        <Field name="meetingRequest">
            {({ field, form }) => (
                <ToggleButtonGroup
                    value={field.value ? "yes" : "no"}
                    exclusive
                    onChange={(e, value) => {
                        if (value !== null) {
                            form.setFieldValue("meetingRequest", value === "yes");
                        }
                    }}
                    aria-label="Request Parent Meeting"
                    className="toggle-group"
                >
                    <ToggleButton value="yes" aria-label="Yes">
                        Yes
                    </ToggleButton>
                    <ToggleButton value="no" aria-label="No">
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
        </Field>
    </Box>
</FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    );
}

export function FormikStep({ children }) {
    return <>{children}</>;
}

FormikStep.propTypes = {
    children: PropTypes.node.isRequired,
    validationSchema: PropTypes.object,
};

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const isLastStep = () => step === childrenArray.length - 1;

    return (
        <Formik {...props} validationSchema={currentChild.props.validationSchema} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers);
            } else {
                setStep((s) => s + 1);
                helpers.setTouched({});
            }
            helpers.setSubmitting(false);
        }}>
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Stepper activeStep={step} alternativeLabel>
                        {childrenArray.map((child, index) => (
                            <Step key={index}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {currentChild}
                    <Grid container justifyContent="space-between" style={{ marginTop: "20px" }}>
                        <Grid item>
                            {step > 0 && (
                                <Button type="button" variant="contained" color="secondary" onClick={() => setStep((s) => s - 1)}>
                                    Back
                                </Button>
                            )}
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}>
                                {isLastStep() ? "Submit" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
