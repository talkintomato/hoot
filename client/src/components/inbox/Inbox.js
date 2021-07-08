import { useState } from "react";
import InboxCard from "./InboxCard";
import RepliesCard from "./RepliesCard";


function Inbox() {
  const [post, setPost] = useState(null);
  const [replyView, setReplyView] = useState(false)

  return (
    <>
      <h1> Inbox </h1>
      {!replyView ?
        <InboxCard selectIndex={value => {setPost(value); setReplyView(true)}} replyView={replyView}></InboxCard> :
        <RepliesCard post={post} back={() => setReplyView(false)}> </RepliesCard>
      }
    </>
  );
}

export default Inbox;
