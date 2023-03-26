import React, { useEffect, useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
import * as mdb from 'mdb-ui-kit'; // lib

import { IconButton, Paper, Skeleton, Stack } from "@mui/material";
import {
  getDownloadURL,
  list,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import NavBar from "../../components/navBar/NavBar";
import { auth, storage } from "../../firebase/firebase";

import './style.css'
// import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [skeleton, setSkeleton] = useState(false);
  const [fName, setFName] = useState("");
  const [file, setFile] = useState([]);
  console.log("🚀 ~ file: Home.jsx:18 ~ Home ~ file", file);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const imageListRef = ref(storage, "UserProfile/");
  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/UserProfile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          alert("upload image");
          console.log(url);
        });
      }
    );
  }

  useEffect(() => {
    setSkeleton(true);

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setSkeleton(false);
          setFile((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(
        "🚀 ~ file: Home.jsx:59 ~ auth.onAuthStateChanged ~ user",
        user
      );
      if (!user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <div>
      <div>
        <div>
          <NavBar profile={file[0]} />
        </div>
        {/* <h1 color="black">hello my name is {userName} </h1> */}

        {skeleton ? (
          <Paper
          
            sx={{
              width: "50%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: { xl: "32rem", md: "22rem" },
              mt: { xl: "12rem", md: "3rem" },
            }}
            elevation={7}
          >
            <Stack alignItems="center" spacing={1}>
              <Skeleton
                sx={{ mt: "1rem" }}
                variant="circular"
                width={200}
                height={200}
              />
              <Skeleton variant="rectangular" width={200} height={80} />
              <Stack gap={2} direction="row">
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>{" "}
              {/**/}
            </Stack>
          </Paper>
        ) : (
          <Paper
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: { xl: "32rem", md: "22rem" },
              mt: { xl: "12rem", md: "3rem" },
            }}
            elevation={7}
          >
            <Stack >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    border: "4px solid #cddc39",
                    padding: "2px",
                    borderRadius: "50%",
                    borderTopColor: "#ff5722",
                    borderLeftColor: "#ff5722",

                    marginTop: "1rem",
                    marginLeft: "1rem",
                    filter: "drop-shadow(0 0 5px #ff5722)",
                  }}
                  width={200}
                  height={200}
                  src={file[0]}
                  alt=""
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <PhotoCamera />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleChange}
                  />
                </IconButton>
                <button className="button-30" onClick={handleUpload}>
                  Upload
                </button>
                 
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      onChange={(e) => setFName(e.target.value)}
                      id="form1"
                      type="text"
                      required
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      onChange={(e) => setFName(e.target.value)}
                      id="form2"
                      type="text"
                      required
                    />
                  </MDBCol>
                </MDBRow>
              </Stack>
            </Stack>
          </Paper>
        )}
      </div>
    </div>
  );
}