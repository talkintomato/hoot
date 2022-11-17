import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import LoginButton from "./loginbtn";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 10,
    padding: 15,
    textAlign: "center",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
    background: "#D8ECEC",
  },
  form: {
    maxWidth: 500,
    margin: 30,
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    padding: 10,
    margin: 10,
  },
  text: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography className={classes.text} style={{ fontSize: 30 }}>
        Welcome to Hoot!
      </Typography>
      <Typography className={classes.text} style={{ fontSize: 18 }}>
        Click here to log in
      </Typography>
      <LoginButton></LoginButton>
    </Card>
  );
}
