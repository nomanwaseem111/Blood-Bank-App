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
import { useFormik } from "formik";
import * as Yup from "yup";

import NavBar from "../NavBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import swal from "sweetalert";

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import CITIES from "../../api/cities.json";
import { db } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(20).required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(99),
    number: Yup.string().min(11, "please Valid Phone number").max(11, "please Valid Phone number")
    .required("Phone number is required"),
  cities: Yup.string().required("Cities is required"),
  blood: Yup.string().required("Blood Type is required"),
  gender: Yup.string().required("gender is required"),
  available: Yup.boolean(),
});

export default function SignUp() {
  
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      number: "",
      gender: "",
      cities: "",
      available: "",
      blood:""
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {

    const q = query(
      collection(db, "Register user react hook form"),
      where("number", "==", data.number)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        const docRef = await addDoc(collection(db, "Register user react hook form"), {
          name: data.name,
          age: data.age,
          gender: data.gender,
          number: data.number,
          available: data.available,
          blood: data.blood,
          cities: data.cities,
        });
        console.log("Document written with ID: ", docRef.id);
        
        swal({
          title: "User Profile Updated",
          icon: "success",
          button: false,
          timer: 3000,
        });
        navigate('/donor')
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
      })
    }
  }
    

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    
                    autoComplete="off"
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    type="text"
                    autoFocus
                    {...register("name", { required: true })}
                  />
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    id="age"
                    label="Age"
                    type="number"
                    name="age"

                    autoFocus
                    {...register("age", { required: true })}
                  />
                  <p style={{ color: "red" }}>{errors.age?.message}</p>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    id="number"
                    label="Number"
                    type="number"
                    autoFocus
                    name="number"

                    {...register("number", { required: true })}
                  />
                  <p style={{ color: "red" }}>{errors.number?.message}</p>
                </Grid>




                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="male"
                      
                      name="gender"
                     

                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Female"
                        value="female"
                        {...register('gender', {required:true})}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Male"
                        value="male"
                        {...register('gender', {required:true})}

                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Other"
                        value="other"
                        {...register('gender', {required:true})}

                      />
                    </RadioGroup>
                  </FormControl>
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
                      name="blood"

                      {...register("blood", { required: true })}
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
                    <p style={{ color: "red" }}>{errors.blood?.message}</p>

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
                      name="cities"
                      {...register("cities", { required: true })}
                    >
                      {CITIES.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e.name}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <p style={{ color: "red" }}>{errors.cities?.message}</p>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox {...register("available")} name="available" />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>

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
