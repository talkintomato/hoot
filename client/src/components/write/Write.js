import data from "../../data";
import ComposeCard from "./ComposeCard";
import DraftCard from "./DraftCard";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Write() {
  const classes = useStyles();
  const [drafts, setDrafts] = useState(true);
  const showCompose = () => setDrafts(false);
  const showDrafts = () => setDrafts(true);

  return (
    <>
      <h1 className={classes.h1}> Write </h1>
      {drafts ? (
        <DraftCard data={data} onCompose={showCompose} />
      ) : (
        <ComposeCard onDrafts={showDrafts} />
      )}
    </>
  );
}

export default Write;
