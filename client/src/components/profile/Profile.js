import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import owl1 from "./hootowl.jpg";
import ProfileCard from "./ProfileCard";
import ProfileData from "./ProfileData";
import Axios from 'axios';
import { useState, useEffect } from "react";


const UseStyles = makeStyles({
  avatar: {
    maxWidth: "100%",
    maxHeight: "70%",
    margin: "50px",
    marginTop: "10px",
  },
});

function Profile() {
  const classes = UseStyles();
  const userId = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [loaded, setLoaded] = useState(false); 

  useEffect( () =>  {
    const fetchData = async () => {
      const res = await Axios.get('http://localhost:5000/users/' + userId)
      setUserData(res.data);
      setLoaded(true);
      console.log("after" , userData);
    }
    fetchData();
    }, [])

  return (
    <>
      <h1> Profile </h1>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <img src={owl1} alt="" className={classes.avatar} />
        </Grid>
        <Grid item xs={6}>
          {loaded ? <ProfileCard data={userData} /> : null}
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
