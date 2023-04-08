import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    fontSize: 25,
    textTransform: "none",
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    height: "3px",
    width: "96%",
    margin: "0px",
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
    marginRight: 10,
    padding: "10px",
    justifyContent: "flex-start",
    width: "88%",
  },
  deleteButton: {
    marginTop: "15px",
    padding: "10px",
    justifyContent: "flex-start",
    width: "10%",
  },
  compose: {
    height: "100%",
    margin: "10px",
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    textTransform: "none",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function DraftCard(props) {
  const classes = useStyles();

  const onDeleteDraft = async (did) => {
    try {
      console.log("delete draft API called");

      await fetch(`api/deletedraft/${did}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.header}>
        <Typography className={classes.title} gutterBottom>
          Drafts
        </Typography>
        <Button
          variant="contained"
          onClick={props.onComposeNew}
          className={classes.compose}
        >
          {" "}
          Compose{" "}
        </Button>
      </CardContent>
      <Divider className={classes.divider} />
      {props.data.map((users) => (
        <div>
          <Button
            variant="contained"
            onClick={() => props.onEditDraft(users.content, users.did)}
            className={classes.messagePrevButton}
          >
            <Typography className={classes.messagePrev}>
              {users.content}
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => onDeleteDraft(users.did)}
            className={classes.deleteButton}
            endIcon={<DeleteIcon />}
          >
            <Typography className={classes.messagePrev}>DELETE</Typography>
          </Button>
        </div>
      ))}
    </Card>
  );
}
