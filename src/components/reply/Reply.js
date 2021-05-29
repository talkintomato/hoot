import { Button, Card, makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  button: {
    backgroundColor: "#EAAB66",
    margin: "20px",
  },
  root: {
    minWidth: 275,
    padding: "50px",
    margin: "100px",
    background: "#000",
    opacity: "70%",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
  },
})


function Reply() {
  const classes = useStyles();

  return (
    <>
      <h1> Reply </h1>
      <Card className={classes.root}>
        <Typography className={classes.title}>
          Dear A,
          Never gonna give you up.
          Never gonna let you down.
          Never gonna run around and desert you.
          Never gonna make you cry.
          Never gonna say goodbye.
          Never gonna tell a lie and hurt you.
       </Typography>
      </Card>
      <Button variant="contained" className={classes.button}> Previous </Button>
      <Button variant="contained" className={classes.button}> Reply </Button>
      <Button variant="contained" className={classes.button}> Next </Button>


    </>
  );
}

export default Reply;

