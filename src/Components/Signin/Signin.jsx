import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()
  
   const [value,setValue] = useState({
     email:"",
     password:""
   })

   const [errorMessage, setErrorMessage] = useState("");

   const loginHandler = (e) => {
       e.preventDefault()
  
       if (
    
        !value.email ||
        !value.password 
     
      ) {
        setErrorMessage("Please Filled All Required Fields");
        return;
      }
      setErrorMessage("");
  
      signInWithEmailAndPassword(auth, value.email, value.password).then(
        (res) => {
       
          
          setValue({
         
            email: "",
            password: "",
          
          });
          swal({
            title: "Signin Successfully",
            icon: "success",
            button: false,
            timer: 3000,
          });
          navigate("/donor")
         
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <BloodtypeIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={value.email}
              onChange={(e) => setValue({...value, email:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth

              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={value.password}

              onChange={(e) => setValue({...value, password:e.target.value})}

            />
            <span className="errorMessage">{errorMessage}</span>
       
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}