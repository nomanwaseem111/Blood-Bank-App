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

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(20).required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(99),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Please enter valid Phone Number")
    .required("Phone number is required"),
  cities: Yup.string().required("Cities is required"),
  blood: Yup.string().required("Blood Type is required"),
  gender: Yup.string().required("gender is required"),
  available: Yup.boolean(),
});

export default function SignUp() {
  const { handleBlur,touched, handleSubmit, handleChange, errors, values } = useFormik({
    initialValues: {
      name: "",
      age: "",
      number: "",
      gender: "male",

      cities: "",
      blood: "",
      available: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values,action) => {
      console.log(values);

      const q = query(
        collection(db, "RegisterUser"),
        where("number", "==", values.number)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        try {
          const docRef = await addDoc(collection(db, "RegisterUser"), {
            name: values.name,
            age: values.age,
            gender: values.gender,
            number: values.number,
            available: values.available,
            blood: values.blood,
            cities: values.cities,
          });
          console.log("Document written with ID: ", docRef.id);
           action.resetForm()
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
    },
  });

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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    autoComplete="off"
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    type="text"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <span style={{ color: "red" }}>
                    {
                      errors.name && touched.name ? (<span>{errors.name}</span>) : null
                    }
                  </span>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    autoComplete="off"
                    name="age"
                    fullWidth
                    id="age"
                    label="Age"
                    type="number"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                  />
                 <span style={{ color: "red" }}>
                    {
                      errors.age && touched.age ? (<span>{errors.age}</span> ): null
                    }
                  </span>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    autoComplete="off"
                    name="number"
                    fullWidth
                    id="number"
                    label="Number"
                    type="number"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                  />
                <span style={{ color: "red" }}>
                    {
                      errors.number && touched.number ? (<span>{errors.number}</span>) : null
                    }
                  </span>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="male"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender}
                      name="gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
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
                      required
                      name="blood"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.blood}
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
                      name="cities"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cities}
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.available}
                          name="available"
                        />
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
