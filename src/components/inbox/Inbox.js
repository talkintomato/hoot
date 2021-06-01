import { Card, makeStyles } from "@material-ui/core";

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
     </>
  );
}

export default Inbox;
