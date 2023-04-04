import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "10px",
    margin: "25px",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
    background: "#D8ECEC",
  },
  textfield: {
    width: "100%",
    height: "250px",
    fontSize: 25,
    color: "black",
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
  hoot: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
  },
  button: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    textTransform: "none",
    margin: "5px",
  },
});

export default function ResponseCard(props) {
  const classes = useStyles();

  const [replied, setReplied] = useState(false);

  return (
    <>
      {replied ? (
        <Card className={classes.root}>
          <Typography className={classes.hoot}>
            Your reply has been sent to {props.hoot.username}. Well done!
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            onClick={props.onBack}
          >
            Back
          </Button>
        </Card>
      ) : (
        <Card className={classes.root}>
          <Typography className={classes.hoot} style={{ fontWeight: "bold" }}>
            From {props.hoot.username}:
          </Typography>
          <Typography className={classes.hoot}>{props.hoot.content}</Typography>
          <TextField
            id="filled-textarea"
            label={"Dear " + props.hoot.username + ","}
            placeholder="Type your reply here..."
            multiline
            rows={10}
            fullWidth
            variant="filled"
          />
          <Button
            className={classes.button}
            variant="contained"
            onClick={props.onBack}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => setReplied(true)}
          >
            Reply
          </Button>
        </Card>
      )}
    </>
  );
}
