import "./App.css";
import LoginCard from "./components/login/LoginCard";
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
  },
});

function App() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className={classes.root}>
      {isAuthenticated ? (
        <Router>
          <NavBar />
          <Route path="/inbox" component={Inbox} />
          <Route path="/profile" component={Profile} />
          <Route path="/reply" component={Reply} />
          <Route path="/stickers" component={Stickers} />
          <Route path="/write" component={Write} />
        </Router>
      ) : (
        <LoginCard />
      )}
    </div>
  );
}

export default App;
