import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import ResponseCard from './ResponseCard';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import PostCard from "./postCard";


const useStyles = makeStyles({
  button: {
    backgroundColor: "#EAAB66",
    margin: "20px",
  },
  root: {
    minWidth: 275,
    padding: "50px",
    margin: "100px",
    background: "#000",
    opacity: "70%",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
  },
})


function Reply() {
  const classes = useStyles();

  const userId = useContext(UserContext);
  const [postPool, setpostPool] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [index, setindex] = useState(0);
  const [reply, setReply] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get('http://localhost:5000/reply/' + userId)
      setpostPool(res.data);
      setLoaded(true);
    }
    fetchData();
  }, [])

  function increment() {
    if (index == postPool.length - 1) {
      setindex(0);
    } else {
      setindex(index + 1);
    }
  }

  function decrement() {
    if (index == 0) {
      setindex(postPool.length - 1);
    } else {
      setindex(index - 1);
    }
  }

  if (!loaded) {
    return <h1> loading </h1>
  }

  else {
    if (!reply) {
      return (
        <>
          <h1> Reply </h1>
          <PostCard post={postPool} increment={() => increment()} decrement={() => decrement()} index={index} reply={() => setReply(true)}> </PostCard>
        </>
      )
    } else {
      return (
        <>
          <h1> Reply </h1>
          <div></div>
          <ResponseCard post={postPool[index]} back={() => setReply(false)}> </ResponseCard>
        </>
      );
    }
  }
}

export default Reply;

