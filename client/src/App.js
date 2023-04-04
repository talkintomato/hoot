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

const useStyles = makeStyles({
  root: {
    alignContent: "center",
    height: "100vh",
  },
});

function App() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className={classes.root}>
      {true ? (
        <Router>
          <NavBar />
          <Route path="/hootbox" component={Hootbox} />
          <Route path="/inbox" component={() => <Inbox uid={0} />} />
          <Route path="/profile" component={() => <Profile uid={0} />} />
          <Route path="/reply" component={Reply} />
          <Route path="/stickers" component={Stickers} />
          <Route path="/write" component={() => <Write uid={0} />} />
        </Router>
      ) : (
        <LoginCard />
      )}
    </div>
  );
}

export default App;
