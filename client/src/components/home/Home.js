// We could probably delete this component

import React from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "50px",
    margin: "10px",
    borderRadius: "10px",
    opacity: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#D8ECEC",
  },
  title: {
    fontSize: 45,
    color: "#000000",
    fontFamily: "Comfortaa",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 32,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    margin: 20,
  },
  button: {
    padding: 20,
    fontFamily: "Comfortaa",
    fontSize: 25,
    fontWeight: "bold",
    borderRadius: 5,
    width: "100%",
    height: 100,
    borderStyle: "dotted",
    borderColor: "#13C7C2",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
  },
  divider: {
    height: "3px",
    width: "96%",
    margin: "20px",
    opacity: "35%",
    borderRadius: "20px",
    backgroundColor: "#4b9b9b",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Welcome to Hoot!</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.subtitle}>
        What would you like to do?
      </Typography>
      <Grid container spacing={1}>
        <Grid className={classes.grid} item xs={3}>
          <Link to="./hootbox">
            <button className={classes.button}>Discover some Hoots!</button>
          </Link>
        </Grid>
        <Grid className={classes.grid} item xs={3}>
          <Link to="./write">
            <button className={classes.button}>Write a new Hoot!</button>
          </Link>
        </Grid>
        <Grid className={classes.grid} item xs={3}>
          <Link to="./inbox">
            <button className={classes.button}>Check your replies!</button>
          </Link>
        </Grid>
        <Grid className={classes.grid} item xs={3}>
          <Link to="./profile">
            <button className={classes.button}>Go to your profile!</button>
          </Link>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
    </div>
  );
}

export default Home;
