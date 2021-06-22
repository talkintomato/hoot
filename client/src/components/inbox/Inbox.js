import { Card, makeStyles } from "@material-ui/core";
import InboxCard from "./InboxCard";
import InboxData from "./InboxData";

const UseStyles = makeStyles({
    card: {
        
    }
})

function Inbox() {
  const classes = UseStyles(); 
  return (
    <>
     <h1> Inbox </h1>
     <Card className={classes.card}> 
        
     </Card>
     <InboxCard data={InboxData}></InboxCard>
     
     </>
  );
}

export default Inbox;
