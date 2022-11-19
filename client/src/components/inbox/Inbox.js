import { makeStyles } from "@material-ui/core";
import InboxCard from "./InboxCard";
import InboxData from "./InboxData";

const UseStyles = makeStyles({
  card: {},
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Inbox() {
  const classes = UseStyles();
  return (
    <>
      <h1 className={classes.h1}> Inbox </h1>
      <InboxCard data={InboxData}></InboxCard>
    </>
  );
}

export default Inbox;
