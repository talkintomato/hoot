import { Button, Card, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'

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

export default function ResponseCard() {
    const classes = UseStyles();
    return (
        <>
            <Grid container>
                <Grid item sm={6}>
                    <Card className={classes.msg}>
                        < Typography className={classes.msgText}>
                            Dear A,
                            Never gonna give you up.
                            Never gonna let you down.
                            Never gonna run around and desert you.
                            Never gonna make you cry.
                            Never gonna say goodbye.
                            Never gonna tell a lie and hurt you. - B.
                            </Typography>
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card className={classes.reply}>
                        <TextField
                            id="filled-textarea"
                            label="Dear B, "
                            // placeholder="Placeholder"
                            multiline
                            rows={10}
                            fullWidth
                            variant="filled"
                        />
                    </Card>
                </Grid>
            </Grid>
            <Button variant="contained" className={classes.button}> Back </Button>
            <Button variant="contained" className={classes.button}> Hoot </Button>
        </>
    )
}
