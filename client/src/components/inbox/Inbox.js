import { makeStyles } from "@material-ui/core";
import InboxCard from "./InboxCard";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  card: {},
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Inbox() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [inbox, setInbox] = useState([]);
  const uid = cookies.Uid;

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
