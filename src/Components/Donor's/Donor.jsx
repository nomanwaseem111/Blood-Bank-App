import React from 'react'
import NavBar from '../NavBar/NavBar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { useState,useEffect } from 'react';






const Donor = () => {
  
  
  
  const [data, setData] = useState([])

  useEffect(() => {
    let unsubscribe = null;

    const getRealTimeData = async () => {
      const q = query(collection(db, "Profile"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const profile = [];
        querySnapshot.forEach((doc) => {
          profile.push(doc.data());
        });
        setData(profile);
      });
    };
    getRealTimeData();

    return () => {
      unsubscribe();
    };
  }, []);


  console.log(data);
  
  return (
    <>
      <NavBar/>
      {/* <Stack border={{md:"1px solid black"}} width={{md:"80%"}} margin={{md:"auto"}} direction={{md:"row"}} display={{md:"flex"}} justifyContent={{md:"space-around"}} >
      <Card sx={{ width:"400px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Noman
        </Typography>
        <Typography variant="h5" component="div">
          Blood Group : 0 Negative
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          City: Karachi
        </Typography>
        <Typography variant="body2">
          Contact : 03122833671
          <br />
          <span>Gender:Male</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Available</Button>
      </CardActions>
    </Card>



    <Card sx={{ width:"400px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Noman
        </Typography>
        <Typography variant="h5" component="div">
          Blood Group : 0 Negative
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          City: Karachi
        </Typography>
        <Typography variant="body2">
          Contact : 03122833671
          <br />
          <span>Gender:Male</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Available</Button>
      </CardActions>
    </Card>



    <Card sx={{ width:"400px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Noman
        </Typography>
        <Typography variant="h5" component="div">
          Blood Group : 0 Negative
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          City: Karachi
        </Typography>
        <Typography variant="body2">
          Contact : 03122833671
          <br />
          <span>Gender:Male</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Available</Button>
      </CardActions>
    </Card>
      </Stack> */}
      <Stack  width={{md:"80%"}} margin={{md:"auto"}} direction={{md:"row"}} display={{md:"flex"}} justifyContent={{md:"space-around"}}>
 
     
     
      <table >

      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Blood Group</th>
          <th>Number</th>
          <th>City</th>
          <th>Age</th>
          <th>Availability</th>
        </tr>
      </thead>
      {
        data.map((e,i) => {
          return(
            <tbody key={i}>
        <tr>
          <td>{e.name}</td>
          <td>{e.gender}</td>
          <td>{e.blood}</td>
          <td>{e.number}</td>
          <td>{e.city}</td>
          <td>{e.age}</td>
          <td>{e.available ? "Yes":"No" }</td>
        </tr>
        
        {/* Add more rows as needed */}
      </tbody>
          )
        })
      }
   
    </table>
    </Stack>
    </>
  )
}

export default Donor
