import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert("User registered successfully!");
        resetForm();
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Formik Registration Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
            <ErrorMessage
              name="username"
              component="div"
              style={{ color: "red", fontSize: "0.8rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red", fontSize: "0.8rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red", fontSize: "0.8rem" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
