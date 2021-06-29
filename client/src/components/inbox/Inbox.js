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

  return (
    <>
     <h1> Inbox </h1>
     <Card className={classes.card}> 
        
     </Card>
     <InboxCard data={InboxData} selectIndex={value => setPost(value)}></InboxCard>
     <RepliesCard post={post}> </RepliesCard>
     
     </>
  );
}

export default Inbox;
