import { Card, makeStyles } from "@material-ui/core";
import { useState } from "react";
import InboxCard from "./InboxCard";
import InboxData from "./InboxData";
import RepliesCard from "./RepliesCard";

const UseStyles = makeStyles({

})

function Inbox() {
  const classes = UseStyles();
  const [post, setPost] = useState(null);
  const [replyView, setReplyView] = useState(false)

  return (
    <>
      <h1> Inbox </h1>
      {!replyView ?
        <InboxCard data={InboxData} selectIndex={value => {setPost(value); setReplyView(true)}} ></InboxCard> :
        <RepliesCard post={post} back={() => setReplyView(false)}> </RepliesCard>
      }
    </>
  );
}

export default Inbox;
