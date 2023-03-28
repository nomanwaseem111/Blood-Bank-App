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
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";

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

  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !value.firstname ||
      !value.lastname ||
      !value.email ||
      !value.password ||
      !value.number
    ) {
      setErrorMessage("Please Filled All Required Fields");
      return;
    }
    setErrorMessage("");

    createUserWithEmailAndPassword(auth, value.email, value.password).then(
      (res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: value.firstname,
        });
        setValue({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          number: "",
        });
        swal({
          title: "Review Sent",
          icon: "success",
          button: false,
          timer: 3000,
        });
        navigate("/signin")
       
      }
    ).catch((error) => {
      setErrorMessage(error.message);
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
            <span className="errorMessage">{errorMessage}</span>
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
                <NavLink to="/signin" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}