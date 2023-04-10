import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

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
  const [reply, setReply] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const uid = cookies.Uid;

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const onReply = async () => {
    try {
      console.log("onReply called");
      setReplied(true);
      const content = {
        hid: props.hoot.hid,
        content: reply,
      };
      console.log(content);

      await fetch(`/api/reply/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
    } catch (err) {
      console.error(err);
    }
  };

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
            onChange={handleChange}
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
            onClick={onReply}
          >
            Reply
          </Button>
        </Card>
      )}
    </>
  );
}
