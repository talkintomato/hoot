import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { Button, Card, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useState, useEffect } from 'react';
import Axios from 'axios';

const UseStyles = makeStyles({
    msg: {
        padding: "20px",
        margin: "100px",
        backgroundColor: 'rgba(00, 00, 00, 0.6)',
        // opacity: "70%",
    },
    reply: {
        padding: "20px",
        margin: "100px",
        backgroundColor: 'rgba(00, 00, 00, 0.2)',
        // opacity: "30%",

    },
    msgText: {
        fontSize: 40,
        color: "#FFF",
    },
    replyText: {
        fontSize: 40,
        color: "#FFF",
    },
    root: {
        spacing: "2",
        direction: "row",
        justify: "flex-start",
        alignItems: "flex-start",
    },
    button: {
        backgroundColor: "#EAAB66",
        margin: "20px",
    },
})

export default function ResponseCard(props) {
    const classes = UseStyles();
    const [content, setContent] = useState("");
    const userId = useContext(UserContext);


    const writePost = () => {
        Axios.post('http://localhost:5000/reply', {
            user_id: userId,
            post_id: props.post.id,
            // post_id: 14,/
            content: content, 
            sticker: 0,
        }).then((() => console.log("success")))
    };

    return (
        <>
            <Grid container>
                <Grid item sm={6}>
                    <Card className={classes.msg}>
                        < Typography className={classes.msgText}>
                            {props.post.content}
                            </Typography>
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card className={classes.reply}>
                        <TextField
                            id="filled-textarea"
                            label="Dear B, "
                            multiline
                            rows={10}
                            fullWidth
                            variant="filled"
                            onChange={(event) => {setContent(event.target.value);}}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Button variant="contained" className={classes.button}> Back </Button>
            <Button variant="contained" className={classes.button} onClick={writePost}> Hoot </Button>
        </>
    )
}
