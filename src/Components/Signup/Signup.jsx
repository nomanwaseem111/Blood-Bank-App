import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMOq8f7uR4jkG_wJdXPxfSaJWDyOMaWh8",
  authDomain: "blood-bank-application-4b85a.firebaseapp.com",
  projectId: "blood-bank-application-4b85a",
  storageBucket: "blood-bank-application-4b85a.appspot.com",
  messagingSenderId: "433762300411",
  appId: "1:433762300411:web:796aa38f56d025c3e31b5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

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
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "signup-users"), {
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: value.password,
        number: value.number,
      });

      setValue({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        number: "",
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Signup Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <BloodtypeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                required
                  autoComplete="off"
                  name="firstname"
                 
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={value.firstname}
                  onChange={(e) =>
                    setValue({ ...value, firstname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                 
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="off"
                  value={value.lastname}
                  onChange={(e) =>
                    setValue({ ...value, lastname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                 
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                 
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="number"
                  label="Number"
                  type="number"
                 
                  id="number"
                  autoComplete="off"
                  value={value.number}
                  onChange={(e) =>
                    setValue({ ...value, number: e.target.value })
                  }
                />
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
                <Link
                  to="/Signin"
                  variant="body2"
                 
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
