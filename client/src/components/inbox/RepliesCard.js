import { React } from 'react';
import { Button, Card, makeStyles, Typography } from "@material-ui/core";
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


function RepliesCard(props) {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [repliesPool, setRepliesPool] = useState([]);

    function increment() {
        if (index == repliesPool.length - 1) {
          setIndex(0);
        } else {
          setIndex(index + 1);
        }
      }
    
      function decrement() {
        if (index == 0) {
          setIndex(repliesPool.length - 1);
        } else {
          setIndex(index - 1);
        }
      }


    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get('http://localhost:5000/inbox/replies/' + props.post)
            setRepliesPool(res.data);
            console.log("after", repliesPool);
        }
        fetchData();
    }, [props.post])

    if (repliesPool.length > 0) {
        return (
            <>
                <Card className={classes.root}>
                    <Typography className={classes.title}>
                        {repliesPool[index].content}
                    </Typography>
                </Card>
                <Button variant="contained" className={classes.button} > back  </Button>
                <Button variant="contained" className={classes.button} onClick={() => decrement()}> Previous </Button>
                <Button variant="contained" className={classes.button} onClick={() => increment()}> Next </Button>

                <div></div>
                <button onClick={() => console.log(repliesPool[0].content)}> logger </button>
            </>
        );
    } else {
        return <h1> No replies found  </h1>
    }
}

export default RepliesCard;