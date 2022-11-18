import data from "../../data";
import ComposeCard from "./ComposeCard";
import DraftCard from "./DraftCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

function Write() {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.h1}> Write </h1>
      <DraftCard data={data}> </DraftCard>
      <ComposeCard></ComposeCard>
    </>
  );
}

export default Write;
