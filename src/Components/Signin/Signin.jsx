import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Formik, Form, Field,ErrorMessage } from "formik";
import * as yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import swal from "sweetalert";


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

const validationSchema = yup.object({


  email: yup.string().email().required("email is required"),
  password: yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  )
  .required("Please enter your password"),

});

export default function SignIn() {
  const navigate = useNavigate();



  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
          validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}

            onSubmit={(values) => {

                 console.log(values,"Values")
                
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((res) => {
                    console.log( res,"Response")
                    
                  swal({
                    title: "Signin Successfully",
                    icon: "success",
                    button: false,
                    timer: 3000,
                  });
                  navigate("/donor");
                })
                .catch((error) => {
                  console.log(error);
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
              <Field
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                placeholder='Email'
              />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </span>
              <Field
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder='Password'

                autoComplete="off"
              />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
            
