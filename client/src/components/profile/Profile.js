import { Grid, makeStyles } from "@material-ui/core";
import owl1 from "./hootowl.jpg";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  avatar: {
    maxWidth: "100%",
    maxHeight: "70%",
    margin: "50px",
    marginTop: "10px",
  },
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Profile(props) {
  const classes = useStyles();

  const [userData, setUserData] = useState({});
  const uid = props.uid;

  useEffect(() => {
    fetch(`/api/user/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  });

  return (
    <div>
      <h1 className={classes.h1}>Profile</h1>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <img src={owl1} alt="" className={classes.avatar} />
        </Grid>
        <Grid item xs={6}>
          <ProfileCard data={userData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
