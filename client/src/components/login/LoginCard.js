import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoginButton from "./loginbtn";


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 30,
    padding: 15,
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
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography>Hoot</Typography>
      <Typography>Login</Typography>
      <LoginButton></LoginButton>
    </Card>
  );
}
