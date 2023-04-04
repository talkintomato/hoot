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
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    alignContent: "center",
    height: "100vh",
  },
});

function App() {
  const classes = useStyles();
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [uid, setUid] = useState(null);

  const authToken = cookies.AuthToken;

  const getUser = async () => {
    console.log("getting user...");
    const userEmail = "darindamnhandsome@sexymail.com";
    try {
      const response = await fetch(`/users/${userEmail}`);
      const json = await response.json();
      setUid(json[0].uid);
      console.log(uid);
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
          <Route path="/inbox" component={() => <Inbox uid={uid} />} />
          <Route path="/profile" component={() => <Profile uid={uid} />} />
          <Route path="/reply" component={Reply} />
          <Route path="/stickers" component={Stickers} />
          <Route path="/write" component={() => <Write uid={uid} />} />
        </Router>
      ) : (
        <LoginCard />
      )}
    </div>
  );
}

export default App;
