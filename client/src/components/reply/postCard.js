import React from 'react';
import { Button, Card, makeStyles, Typography } from "@material-ui/core";


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


function PostCard(props) {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <Typography className={classes.title}>
                    {props.post[props.index].content}
                </Typography>
            </Card>
            <Button variant="contained" className={classes.button} onClick={() => props.decrement()}> Previous </Button>
            <Button variant="contained" className={classes.button} onClick={() => props.reply()}> Reply </Button>
            <Button variant="contained" className={classes.button} onClick={() => props.increment()}> Next </Button>

            <div></div>
        </>
    );
}

export default PostCard;

