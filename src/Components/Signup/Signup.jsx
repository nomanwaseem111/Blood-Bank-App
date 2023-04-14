import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";

import { collection, addDoc } from "firebase/firestore";
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

const schema = yup.object({
  firstName: yup
    .string()
    .required("first name is required")
    .min(3, "first name must be at least 3 characters")
    .max(20, "firstName must be at most 20 characters"),
  lastName: yup
    .string()
    .required("last name is required")
    .min(3, "last name must be at least 3 characters")
    .max(20, "last must be at most 20 characters"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password"),
  confirm_password: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"), null], "password must match"),
});

export default function SignUp() {
 
 
   const navigate = useNavigate()
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
      
    createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )
      .then(async (res) => {
        const user = res.user;
        try {
          const docRef = await addDoc(
            collection(db, "signup-users react hook form"),
            {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
              confirm_password: data.confirm_password,
            }
          );
        

          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        updateProfile(user, {
          displayName: data.firstName,
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
  };

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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  name="firstName"
                  {...register("firstName", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.firstName?.message}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  {...register("lastName", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.lastName?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // required
                  autoComplete="off"
                  {...register("email", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  {...register("password", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirm_password"
                  label="confirm_password"
                  type="password"
                  id="confirm_password"
                  autoComplete="off"
                  {...register("confirm_password", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.confirm_password?.message}</p>
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
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
