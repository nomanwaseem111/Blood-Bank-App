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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import NavBar from '../NavBar/NavBar'
import MenuItem from '@mui/material/MenuItem';



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
    name: "",
    age: "",
    number: "",
    area: "",
   
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !value.name ||
      !value.age ||
   
      !value.number ||
      !value.area
    ) {
      setErrorMessage("Please Filled All Required Fields");
      return;
    }
    setErrorMessage("");


    console.log(value);

  
  };


  

  return (
    <>
      <NavBar />
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
              Register as Donor
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    autoComplete="off"
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </Grid>





                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="off"
                    value={value.age}
                    onChange={(e) =>
                      setValue({ ...value, age: e.target.value })
                    }
                  />
                </Grid>


{/* 
                <Grid item xs={12}>

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" >Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>


                </Grid> */}





                {/* <Grid item xs={12}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '400px' },
                    }}
                    noValidate
                    autoComplete="off"

                  >



                    <TextField
                      id="bloodType"
                      select
                      label="Blood Type"
                      defaultValue="bloodType"
                      SelectProps={{
                        native: true,
                      }}


                    >

                      <option value="positive" >B Positive</option>
                      <option value="negative" >0 Negative</option>

                    </TextField>


                  </Box>
                </Grid> */}


                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    id="number"
                    label="Number"
                    name="number"
                    autoComplete="off"
                    value={value.number}
                    onChange={(e) =>
                      setValue({ ...value, number: e.target.value })
                    }
                  />
                </Grid>


                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    autoComplete="off"
                    name="area"
                    fullWidth
                    id="area"
                    label="Area"
                    autoFocus
                    value={value.area}
                    onChange={(e) =>
                      setValue({ ...value, area: e.target.value })
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
                Register
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}