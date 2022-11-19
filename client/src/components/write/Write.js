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
  const [drafts, setDrafts] = useState({ show: true, draft: "" });
  const showCompose = (draft) => setDrafts({ show: false, draft: draft });
  const showDrafts = () => setDrafts({ show: true, draft: "" });

  return (
    <>
      <h1 className={classes.h1}> Write </h1>
      {drafts.show ? (
        <DraftCard
          data={data}
          onComposeNew={() => showCompose("")}
          onEditDraft={(draft) => showCompose(draft)}
        />
      ) : (
        <ComposeCard onDrafts={showDrafts} prefill={drafts.draft} />
      )}
    </>
  );
}

export default Write;
