import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import HootboxCard from "./HootboxCard";

const useStyles = makeStyles({
  card: {},
  h1: {
    fontFamily: "Comfortaa",
    fontSize: 23,
    textAlign: "center",
  },
});

// This component is for the Hoot "Cloud"
function Hootbox() {
  const classes = useStyles();

  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    console.log("fetching hoots...");
    fetch("/api/hoots")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHoots(data);
      });
  });

  return (
    <>
      <h1 className={classes.h1}> Hootbox </h1>
      <HootboxCard data={hoots}></HootboxCard>
    </>
  );
}

export default Hootbox;
