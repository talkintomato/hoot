import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "100",
    margin: "100px",
    background: "#000",
    opacity: "70%",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    width: '100%',
    backgroundColor: "#ffff",
  },
  messagePrev: {
    width: '100%',
    margin: "20px",
    padding: "10px",
  },
  compose: {
    height: "100%",
    margin: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default function DraftCard(props) {
  const classes = useStyles();

  const [userDrafts, setUserDrafts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const userId = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get('http://localhost:5000/write/' + userId)
      setUserDrafts(res.data);
      setLoaded(true);
      console.log("after", userDrafts);
    }
    fetchData();
  }, [])



  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.header}>
          <Typography className={classes.title} gutterBottom>
            Drafts
          </Typography>
          <Button variant="contained" className={classes.compose} onClick={() => props.onClick(null)}> Compose </Button>
        </CardContent>
        <Divider className={classes.divider} />
        {(userDrafts.length > 0) ?
          userDrafts.map((drafts) => (
            <Button variant="contained" className={classes.messagePrev} onClick={() => props.onClick(drafts.id)}> {drafts.content} </Button>
          ))
          : <h1> No Drafts Found </h1>
        }

      </Card>
    </>
  );
}