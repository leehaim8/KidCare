import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import { object, string, number, boolean } from "yup";
import PropTypes from "prop-types";

export default function PeriodicFeedback() {
    const initialValues = {
        childID: "",
        name: "",
        firstName: "",
        lastName: "",
        millioner: false,
        money: 0,
        description: "",
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

    const handleSubmit = async (values, helpers) => {
        console.log("Submitted Values:", values);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
        helpers.setSubmitting(false);
    };

    return (
        <div>
            <Header />
            <Breadcrumbs />
            <Card>
                <CardHeader title="Periodic Feedback" />
                <CardContent>
                    <FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
                        {/* Step 1: Select Child */}
                        <FormikStep
                            label="Select Child"
                            validationSchema={object({
                                childID: string().required("Please select a child"),
                            })}
                        >
                            <Box paddingBottom={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="child-select-label">Select a Child</InputLabel>
                                    <Field
                                        name="childID"
                                        as={Select}
                                        labelId="child-select-label"
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>Select a child</em>
                                        </MenuItem>
                                        {childrens.map((child) => (
                                            <MenuItem
                                                key={child._id}
                                                value={JSON.stringify({ name: child.name, id: child._id })}
                                            >
                                                {child.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Box>
                        </FormikStep>

                        {/* Step 2: Personal Information */}
                        <FormikStep
                            label="Personal Information"
                            validationSchema={object({
                                firstName: string().required("First Name is required"),
                                lastName: string().required("Last Name is required"),
                                millioner: boolean()
                                    .required("This field is required")
                                    .oneOf([true], "You must check this box to proceed"),
                            })}
                        >
                            <Box paddingBottom={2}>
                                <Field
                                    name="firstName"
                                    component={TextField}
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                            <Box paddingBottom={2}>
                                <Field
                                    name="lastName"
                                    component={TextField}
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                            <Box paddingBottom={2}>
                                <Field
                                    name="millioner"
                                    type="checkbox"
                                    component={CheckboxWithLabel}
                                    Label={{ label: "I am a Millionaire" }}
                                />
                            </Box>
                        </FormikStep>

                        {/* Step 3: Money */}
                        <FormikStep
                            label="Money"
                            validationSchema={object({
                                money: number().required("Money is required").min(1000000, "You must have at least 1 million dollars"),
                            })}
                        >
                            <Box paddingBottom={2}>
                                <Field
                                    name="money"
                                    component={TextField}
                                    label="Money"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </FormikStep>

                        {/* Step 4: Description */}
                        <FormikStep
                            label="Description"
                            validationSchema={object({
                                description: string().required("Description is required"),
                            })}
                        >
                            <Box paddingBottom={2}>
                                <Field
                                    name="description"
                                    component={TextField}
                                    label="Description"
                                    fullWidth
                                    margin="normal"
                                />
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
    const [step, setStep] = React.useState(0);
    const currentChild = childrenArray[step];
    const isLastStep = () => step === childrenArray.length - 1;

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    helpers.setSubmitting(false);
                } else {
                    setStep((s) => s + 1);
                    helpers.setTouched({});
                    helpers.setSubmitting(false);
                }
            }}
        >
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
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setStep((s) => s - 1)}
                                    disabled={isSubmitting}
                                >
                                    Back
                                </Button>
                            )}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                disabled={isSubmitting}
                            >
                                {isLastStep() ? "Submit" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
