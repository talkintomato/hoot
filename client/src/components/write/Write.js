import ComposeCard from "./ComposeCard";
import DraftCard from "./DraftCard";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Write(props) {
  const classes = useStyles();
  const [drafts, setDrafts] = useState({ show: true, draft: {}, did: null });
  const [draftList, setDraftList] = useState([]);
  const showCompose = (draft, did) =>
    setDrafts({ show: false, draft: draft, did: did });
  const showDrafts = () => setDrafts({ show: true, draft: {}, did: null });

  useEffect(() => {
    fetch(`/api/drafts/${props.uid}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setDraftList(data);
      });
  });

  return (
    <>
      <h1 className={classes.h1}> Write </h1>
      {drafts.show ? (
        <DraftCard
          data={draftList}
          onComposeNew={() => showCompose("", null)}
          onEditDraft={(draft, did) => showCompose(draft, did)}
        />
      ) : (
        <ComposeCard onDrafts={showDrafts} prefill={drafts.draft} />
      )}
    </>
  );
}

export default Write;
