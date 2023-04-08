import "./App.css";
import LoginCard from "./components/login/LoginCard";
import Hootbox from "./components/hootbox/Hootbox";
import Inbox from "./components/inbox/Inbox";
import NavBar from "./components/Navbar";
import Profile from "./components/profile/Profile";
import Reply from "./components/reply/Reply";
import Stickers from "./components/stickers/Stickers";
import Write from "./components/write/Write";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#eef7f7",
  },
});

function App() {
  const classes = useStyles();

  const [cookies, setCookie, removeCookie] = useCookies(null);

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const getUser = async () => {
    console.log("getting user...");
    try {
      const response = await fetch(`/users/${userEmail}`);
      const json = await response.json();
      setCookie("Uid", json[0].uid);
      console.log("cookie uid set");
    } catch (err) {
      console.error(err);
    }
  };

  // NOTE: This function serves only to populate the database with some "bot" users for testing purposes
  const devMode = async (e) => {
    console.log("activating dev mode...");
    try {
      const response = await fetch("/devmode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Dev mode activated" }),
      });
      const data = await response.json();
      console.log(data);
      console.log("bots added!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getUser();
    }
  }, []);

  return (
    <div className={classes.root}>
      {authToken ? (
        <Router>
          <NavBar />
          <Route path="/hootbox" component={Hootbox} />
          <Route path="/inbox" component={() => <Inbox />} />
          <Route path="/profile" component={() => <Profile />} />
          <Route path="/reply" component={Reply} />
          <Route path="/stickers" component={Stickers} />
          <Route path="/write" component={() => <Write />} />
        </Router>
      ) : (
        <div className={classes.loginPage}>
          <LoginCard />
        </div>
      )}
      <button onClick={devMode}>dev mode</button>
    </div>
  );
}

export default App;
