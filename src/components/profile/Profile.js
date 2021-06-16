import NavBar from "../Navbar";
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import owl1 from "./hootowl.jpg";
import ProfileCard from "./ProfileCard";
import ProfileData from "./ProfileData";

const UseStyles = makeStyles({
  profileBox: {
    padding: "20px",
    backgroundColor: "rgba(00, 00, 00, 0.6)",
  },
  profileName: {
    fontSize: 55,
    color: "white",
  },
  profileBody: {
    fontSize: 36,
    color: "white",
  },
  avatar: {
    maxWidth: "100%",
    maxHeight: "70%",
    margin: "50px",
    marginTop: "10px",
  },
});

function Profile() {
  const classes = UseStyles();
  return (
    <>
      <h1> Profile </h1>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <img src={owl1} alt="" className={classes.avatar} />
        </Grid>
        <Grid item xs={6}>
          <ProfileCard data={ProfileData} />
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
