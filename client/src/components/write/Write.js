import { useCookies } from "react-cookie";
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
  const [draft, setDraft] = useState({ show: true, content: "", did: null });
  const [draftList, setDraftList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const uid = cookies.Uid;
  const showCompose = (content, did) =>
    setDraft({ show: false, content: content, did: did });
  const showDraft = () => setDraft({ show: true, content: "", did: null });

  useEffect(() => {
    fetch(`/api/drafts/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setDraftList(data);
      });
  });

  return (
    <>
      <h1 className={classes.h1}> Write </h1>
      {draft.show ? (
        <DraftCard
          data={draftList}
          onComposeNew={() => showCompose("", null)}
          onEditDraft={(content, did) => showCompose(content, did)}
        />
      ) : (
        <ComposeCard onDraft={showDraft} draft={draft} />
      )}
    </>
  );
}

export default Write;
