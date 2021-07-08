import './App.css';
import LoginCard from './components/login/LoginCard';
import Inbox from './components/inbox/Inbox';
import NavBar from './components/Navbar'
import Profile from './components/profile/Profile';
import Reply from './components/reply/Reply';
import Stickers from './components/stickers/Stickers';
import Write from './components/write/Write';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './components/UserContext';
import { makeStyles } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    alignContent: "center",
  },
});

function App() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userId, setUserId] = useState("");

  const newUser = () => {
    // add post to hoots table
      Axios.post('http://localhost:5000/users', {
        id: user.sub,
        email: user.email,
        username: user.nickname,
      }).then((() => console.log("success add new user")));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setUserId(user.sub);
      newUser();
      console.log("ran isAUthenticated")
    };
  }, [isAuthenticated])

  if (isLoading) return <h1> loading... </h1>;

  if (isAuthenticated) {
    return (
      <>
        <Router>
          <NavBar />
          <UserContext.Provider value={userId}>
            <Route path="/inbox" component={Inbox} />
            <Route path="/profile" component={Profile} />
            <Route path="/reply" component={Reply} />
            <Route path="/stickers" component={Stickers} />
            <Route path="/write" component={Write} />
          </UserContext.Provider>
        </Router>
        {/* <button onClick={()=>{console.log(user.sub); setUserId(user.sub)}}> click </button> */}
        {/* <button onClick={() => { console.log(user.sub); }}> check </button>

        <JSONPretty data={user}></JSONPretty> */}

      </>
    )
  } else {
    return (
      <LoginCard />
    );
  }
}

export default App;
