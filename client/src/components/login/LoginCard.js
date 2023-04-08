import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import LoginButton from "./loginbtn";
import { useState } from "react";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 10,
    padding: 15,
    textAlign: "center",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
    borderRadius: 10,
    background: "#D8ECEC",
  },
  form: {
    maxWidth: 500,
    margin: 30,
    padding: 15,
    fontFamily: "Comfortaa",
    fontSize: 12,
    fontWeight: "bold",
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
    fontFamily: "Comfortaa",
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 5,
    width: "50%",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
  },
  text: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(`/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (data.detail) {
        setError(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
        setCookie("Username", data.username);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className={classes.root}>
      <Typography className={classes.text} style={{ fontSize: 30 }}>
        Welcome to Hoot!
      </Typography>
      <Typography className={classes.text} style={{ fontSize: 18 }}>
        {isLogin ? "Log In!" : "Register for a new account!"}
      </Typography>
      <form className={classes.form}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isLogin && (
          <input
            type="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input
          type="submit"
          onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
        />
        {error && <p>{error}</p>}
      </form>
      {/* <LoginButton></LoginButton> */}
      <div>
        <button
          className={classes.button}
          onClick={() => viewLogin(false)}
          style={{
            backgroundColor: isLogin
              ? "rgb(255, 255, 255)"
              : "rgb(188, 188, 188)",
          }}
        >
          Click here to register
        </button>
        <button
          className={classes.button}
          onClick={() => viewLogin(true)}
          style={{
            backgroundColor: !isLogin
              ? "rgb(255, 255, 255)"
              : "rgb(188, 188, 188)",
          }}
        >
          Click here to log in
        </button>
      </div>
    </Card>
  );
}
