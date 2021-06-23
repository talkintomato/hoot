import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';


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
    },
    form: {
        color: '#FFFF',
    },
    button: {
        backgroundColor: "#EAAB66",
        margin: "20px",
    }
});


export default function ComposeCard() {
    const classes = useStyles();
    const [content, setContent] = useState("");

    const writePost = () => {
        Axios.post('http://localhost:5000/write', {
            id: 0,
            user_id: 1,
            content: content, 
            reply_count: 0,
            time: Date(),
        }).then((() => console.log("success")))
    };

    const display = () => {console.log(content)};


    return (
        <>
            <Card className={classes.root}>
                <CardContent className={classes.header}>
                    <Typography className={classes.title} gutterBottom>
                        Compose
                    </Typography>
                </CardContent>
                <CardContent>
                    <form>
                        <textarea rows="6" onChange={(event) => {setContent(event.target.value)}}>
                        </textarea>
                    </form>
                </CardContent>
            </Card>
            <Button variant="contained" className={classes.button}>
                Back
            </Button>
            <Button variant="contained" className={classes.button}> Save Draft </Button>
            <Button variant="contained" className={classes.button} onClick={writePost}> Hoot </Button>
        </>
    );
}