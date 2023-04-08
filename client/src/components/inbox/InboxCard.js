import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ResponseCard from "../reply/ResponseCard";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "10px",
    margin: "25px",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
    background: "#D8ECEC",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    height: "3px",
    width: "96%",
    margin: "20px",
    opacity: "35%",
    borderRadius: "20px",
    backgroundColor: "#4b9b9b",
  },
  messagePrev: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    textTransform: "none",
  },
  messagePrevButton: {
    marginTop: "15px",
    padding: "10px",
    justifyContent: "flex-start",
  },
});

export default function InboxCard(props) {
  const classes = useStyles();
  // console.log(props.data);

  const [reply, setReply] = useState({ open: false, hoot: "" });
  const showInbox = () => setReply({ open: false, hoot: "" });

  return (
    <>
      {reply.open ? (
        <ResponseCard hoot={reply.hoot} onBack={showInbox} />
      ) : (
        <Card className={classes.root}>
          <CardContent>
            {props.data.map((users) => (
              <Button
                variant="contained"
                className={classes.messagePrevButton}
                fullWidth
                endIcon={<SaveIcon />}
                onClick={() => setReply({ open: true, hoot: users })}
              >
                <Typography
                  className={classes.messagePrev}
                  style={{ fontWeight: "bold" }}
                >
                  {users.username}:&nbsp;
                </Typography>
                <Typography className={classes.messagePrev}>
                  {users.content}{" "}
                </Typography>
              </Button>
            ))}
            <Divider className={classes.divider} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
