import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

export default function SimpleCard({ Login, error }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [details, setDetails] = useState({ username: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <Card className={classes.root}>
      <Typography>Hoot</Typography>
      <Typography>Login</Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setDetails({ ...details, username: e.target.value })}
          value={details.username}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
        {error != "" ? <Typography>{error}</Typography> : ""}
        <Button
          variant="contained"
          size="medium"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          className={classes.button}
        >
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
