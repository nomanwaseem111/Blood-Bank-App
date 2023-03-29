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
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {collection,addDoc} from 'firebase/firestore'

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
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [area, setArea] = useState("");
  const [blood, setBlood] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
  
  
    e.preventDefault();

    if (!name || !age || !gender || !number || !area || !blood) {
      setErrorMessage("Please Filled All Required Fields");
      return;
    }
    setErrorMessage("");

    try {
      const docRef = await addDoc(collection(db, "Profile"), {
        name:name,
        age:age,
        gender:gender,
        number:number,
        blood:blood,
        area:area
      });
      setName("");
      setAge("");
      setGender("");
      setNumber("");
      setArea("")
      setBlood("")

      swal({
        title: "Profile Date Saved",
        icon: "success",
        button: false,
        timer: 3000,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate('/donor')
    } catch (e) {
      console.error("Error adding document: ", e);
      swal({
        title: e.message,
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
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
                      value={blood}
                      onChange={(e) => setBlood(e.target.value)}
                    >
                      <MenuItem value="B Postive">B Postive</MenuItem>
                      <MenuItem value="O Negative">O Negative</MenuItem>
                      <MenuItem value="A+ Positve">A+ Positve</MenuItem>
                    </Select>
                  </FormControl>
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
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
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
