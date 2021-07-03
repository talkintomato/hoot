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
        console.log("first" + index);
        if (index === repliesPool.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }

        markRead()
    }

    function markRead() {
        if (repliesPool.length > 0)
            if (repliesPool[index].unread === 1) {
                const fetchData = async () => {
                    const res = await Axios.put('http://localhost:5000/inbox/replies/' + repliesPool[index].reply_id)
                    console.log(index + " marked as read");
                }
                fetchData();
            } else {
                console.log("do nothing")
            }
    }

    function decrement() {
        if (index === 0) {
            setIndex(repliesPool.length - 1);
        } else {
            setIndex(index - 1);
        }
        markRead()
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
                        {(index + 1) + " / " + (repliesPool.length)}
                    </Typography>
                    <Typography className={classes.title}>
                        {repliesPool[index].content}
                    </Typography>
                </Card>
                <Button variant="contained" className={classes.button} onClick={() => {markRead(); props.back() }}> back  </Button>
                <Button variant="contained" className={classes.button} onClick={() => decrement()}> Previous </Button>
                <Button variant="contained" className={classes.button} onClick={() => increment()}> Next </Button>
                <button onClick={() => console.log(index)}> </button>
            </>
        );
    } else {
        return <>
            <h1> No replies found  </h1>
            <Button variant="contained" className={classes.button} onClick={() => props.back()}> back  </Button>
        </>
    }
}

export default RepliesCard;