import { makeStyles } from "@material-ui/core";
import InboxCard from "./InboxCard";
import InboxData from "./InboxData";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  card: {},
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Inbox(props) {
  const classes = useStyles();

  const [inbox, setInbox] = useState([]);
  const uid = props.uid;

  useEffect(() => {
    fetch(`/api/inbox/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setInbox(data);
      });
  });

  return (
    <>
      <h1 className={classes.h1}> Inbox </h1>
      <InboxCard data={inbox}></InboxCard>
    </>
  );
}

export default Inbox;
