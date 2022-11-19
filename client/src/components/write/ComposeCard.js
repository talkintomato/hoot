import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { useState } from "react";

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
    fontSize: 25,
    color: "black",
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    backgroundColor: "#ffff",
  },
  messagePrev: {
    width: "100%",
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
  formContainer: {
    color: "black",
    margin: "5px",
  },
  form: {
    width: "100%",
  },
  textarea: {
    width: "100%",
    height: "250px",
  },
  button: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    textTransform: "none",
    margin: "5px",
  },
});

export default function ComposeCard(props) {
  const classes = useStyles();

  const [hooted, setHooted] = useState(false);

  return (
    <>
      {hooted ? (
        <Card className={classes.root}>
          <Typography className={classes.button}>
            Your hoot has been sent. Great job!
          </Typography>
          <Button
            variant="contained"
            onClick={props.onDrafts}
            className={classes.button}
          >
            Back to Drafts
          </Button>
        </Card>
      ) : (
        <Card className={classes.root}>
          <CardContent className={classes.header}>
            <Typography className={classes.title} gutterBottom>
              Compose
            </Typography>
          </CardContent>
          <CardContent className={classes.formContainer}>
            <form className={classes.form}>
              <textarea className={classes.textarea}></textarea>
            </form>
          </CardContent>
          <Button
            variant="contained"
            onClick={props.onDrafts}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            // add save draft feature here
            onClick={props.onDrafts}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setHooted(true)}
          >
            Hoot
          </Button>
        </Card>
      )}
    </>
  );
}
