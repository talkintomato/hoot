import "./App.css";
import LoginCard from "./components/login/LoginCard";
import Inbox from "./components/inbox/Inbox";
import NavBar from "./components/Navbar";
import Profile from "./components/profile/Profile";
import Reply from "./components/reply/Reply";
import Stickers from "./components/stickers/Stickers";
import Write from "./components/write/Write";
import SignUp from "./components/signup/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileData from "./components/profile/ProfileData";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    alignContent: "center",
  },
});

function App() {
  const classes = useStyles();

  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.username === ProfileData.username &&
      details.password === ProfileData.password
    ) {
      console.log("Logged in!");
      setUser({
        username: details.username,
        password: details.password,
      });
    } else {
      console.log("Wrong username or password!");
      setError("Wrong username or password!");
    }
  };

  const Logout = () => {
    console.log("Logged out");
    setUser({ username: "", password: "" });
  };

  return (
    <div className={classes.root}>
      {user.password !== "" ? (
        <Router>
          <NavBar Logout={Logout} />
          <Route path="/inbox" component={Inbox} />
          <Route path="/profile" component={Profile} />
          <Route path="/reply" component={Reply} />
          <Route path="/stickers" component={Stickers} />
          <Route path="/write" component={Write} />
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <LoginCard Login={Login} error={error} />}
            />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
