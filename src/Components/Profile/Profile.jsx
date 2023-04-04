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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NavLink, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

import NavBar from "../NavBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import swal from 'sweetalert';

import { collection, addDoc, query,where, getDocs } from "firebase/firestore";
import CITIES from "../../api/cities.json";
import { db } from "../../firebase/firebase";
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

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [number, setNumber] = useState("");
  const [available, setAvailable] = useState(false);
  const [blood, setBlood] = useState("");
  const [city, setCity] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "Profile"),
      where("number", "==", number)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        const docRef = await addDoc(collection(db, "Profile"), {
          name: name,
          age: age,
          gender: gender,
          number: number,
          available: available,
          blood: blood,
          city: city,
        });
        console.log("Document written with ID: ", docRef.id);
      
        setName("");
      setAge("");
      setGender("");
      setNumber("");
      setAvailable(false);
      setBlood("");
      setCity("");


      swal({
        title: "User Profile Updated",
        icon: "success",
        button: false,
        timer: 3000,
      });
       
      } catch (e) {
        swal({
          title: e,
          icon: "error",
          button: false,
          timer: 3000,
        });
        console.error("Error adding document: ", e);
      }
    } else {
   
      swal({
        title: "Number Already Registered",
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
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
            <form               onSubmit={handleSubmit}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                                      required

                    type="number"
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="off"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="male"
                      name="radio-buttons-group"
                      value={gender}
                      required

                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    id="number"
                    required

                    label="Number"
                    name="number"
                    autoComplete="off"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Blood Group
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="bloodGroup"
                      required

                      value={blood}
                      onChange={(e) => setBlood(e.target.value)}
                    >
                      <MenuItem value="A+ Positive">A+</MenuItem>
                      <MenuItem value="A- Negative">A-</MenuItem>
                      <MenuItem value="B+ Positive">B+</MenuItem>
                      <MenuItem value="B- Negative">B-</MenuItem>
                      <MenuItem value="O+ Positive">O+</MenuItem>
                      <MenuItem value="O- Negative">O-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Cities
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Cities"
                      required

                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {CITIES.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e.name}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={available}

                          onChange={(e) => setAvailable(true)}
                        />
                      }
                      label="Available"
                    />
                  </FormGroup>
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
           
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
