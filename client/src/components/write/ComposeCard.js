import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';
import { UserContext } from '../UserContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';



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
    const UserId = useContext(UserContext);
    const [openDraft, setOpenDraft] = React.useState(false);
    const [openPost, setOpenPost] = React.useState(false);

    const handleDraftClickOpen = () => {
        setOpenDraft(true);
    };

    const handleDraftClose = () => {
        setOpenDraft(false);
        setContent("");
    };

    const handlePostClickOpen = () => {
        setOpenPost(true);
    };

    const handlePostClose = () => {
        setOpenPost(false);
        setContent("");
    };

    const writePost = () => {
        if (content.trim().length > 0) {
            Axios.post('http://localhost:5000/write', {
                id: 0,
                user_id: UserId,
                content: content,
                draft: false,
                reply_count: 0,
                time: Date(),
            }).then((() => console.log("success")));

            handlePostClickOpen();
        }
    };

    const saveDraft = () => {
        Axios.post('http://localhost:5000/write', {
            id: 0,
            user_id: UserId,
            content: content,
            draft: true,
            reply_count: 0,
            time: Date(),
        }).then((() => console.log("success")));

        handleDraftClickOpen();
    };

    // const display = () => {console.log(content)};


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
                        <textarea rows="6" onChange={(event) => { setContent(event.target.value) }} value={content}>
                        </textarea>
                    </form>
                </CardContent>
            </Card>
            <Button variant="contained" className={classes.button}>
                Back
            </Button>
            <Button variant="contained" className={classes.button} onClick={saveDraft}> Save Draft </Button>
            <Dialog
                open={openDraft}
                onClose={handleDraftClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hoot draft has been saved!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDraftClose} color="primary" autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" className={classes.button} onClick={writePost}> Hoot </Button>
            <Dialog
                open={openPost}
                onClose={handlePostClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hoot has been Sent!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePostClose} color="primary" autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}