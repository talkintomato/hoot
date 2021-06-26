import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import ResponseCard from './ResponseCard';
import { useState, useEffect } from 'react';
import Axios from 'axios';


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

  useEffect(() =>  {
    const fetchData = async () => {
      const res = await Axios.get('http://localhost:5000/reply/' + userId)
      setpostPool(res.data);
      setLoaded(true);
    }
    fetchData();
    }, [])
  

    // console.log("after" , postPool);


  return (
    <>
      <h1> Reply </h1>
      <Card className={classes.root}>
        <Typography className={classes.title}>
        {loaded? postPool[index].content: <Typography> No hoots right now! </Typography>}
       </Typography>
      </Card>
      <Button variant="contained" className={classes.button} onClick={()=> {setindex(index-1);}}> Previous </Button>
      <Button variant="contained" className={classes.button} > Reply </Button>
      <Button variant="contained" className={classes.button} onClick={()=> {setindex(index+1);}}> Next </Button>

    <div></div>

    {loaded ? <ResponseCard post={postPool[index]}> </ResponseCard> : null}
    </>
  );
}

export default Reply;

