import React from "react";
import {
  Card,
  TextField,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { useState } from "react";

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

function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>Sign up here!</h1>
      <Card className={classes.root}>
        <Typography>Enter your details:</Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={() => console.log(values.password)}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            required="true"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            required="true"
            value={values.username}
            name="username"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            required="true"
            value={values.password}
            name="password"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            required="true"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </>
  );
}

export default SignUp;
