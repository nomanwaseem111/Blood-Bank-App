import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link,useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "first name must be at least 3 characters")
    .required("first name is required"),
  lastName: yup
    .string()
    .min(3, "last name must be at least 3 characters")
    .required("last name is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password"),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "password must match"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" marginBottom={{ md: "30px" }}>
            Sign up
          </Typography>

          <Formik
            validationSchema={validationSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            onSubmit={(values, action) => {
              createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              )
                .then(async (res) => {
                  const user = res.user;
                  try {
                    const docRef = await addDoc(
                      collection(db, "signup-users"),
                      {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        confirm_password: values.confirm_password,
                      }
                    );
                    action.resetForm();

                    console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                  updateProfile(user, {
                    displayName: values.firstName,
                  });

                  swal({
                    title: "Signup Successfully",
                    icon: "success",
                    button: false,
                    timer: 3000,
                  });

                  navigate("/signin");
                })
                .catch((error) => {
                  console.log(error.message);
                  swal({
                    title: error.message,
                    icon: "error",
                    button: false,
                    timer: 3000,
                  });
                });
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoComplete="off"
                    name="firstName"
                    required
                    type="text"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    placeholder="First Name"
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="firstName" />
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="off"
                    placeholder="Last Name"
                    type="text"
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="lastName" />
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    type="email"
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Password"
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    name="confirm_password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Confirm Password"
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" />
                  </span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to='/signin' variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
