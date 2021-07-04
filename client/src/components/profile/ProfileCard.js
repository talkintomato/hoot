import React from "react";
import {
  Button,
  Card,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";

const UseStyles = makeStyles({
  profileBox: {
    padding: "20px",
    backgroundColor: "rgba(00, 00, 00, 0.6)",
  },
  profileName: {
    fontSize: 55,
    color: "white",
  },
  profileBody: {
    fontSize: 30,
    color: "white",
  },
  accountDetails: {
    fontSize: 16,
    color: "#CFD1D2",
    marginBottom: 10,
  },
  divider: {
    width: "100%",
    padding: 1,
    margin: "10px",
  },
});

function ProfileCard(props) {
  console.log(props.data);
  const user = props.data;
  const classes = UseStyles();

  return (
    <Card className={classes.profileBox}>
      <Typography className={classes.profileName}>Darin Loh Han Sum</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.profileBody}>
        HOOTS: {user.hoots}
        <br />
        ANSWERS: {user.answers}
        <br />
        STICKERS: {user.stickers}
        <br />
        LEVEL: {user.rank}
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.accountDetails}>
        Account Details: <br />
        Username: {user.username}
        <br />
        Email: {user.email}
        <br />
        Password: {user.password.replace(/./g, "*")}
      </Typography>
      <Button variant="outlined" size="small">
        Edit
      </Button>
    </Card>
  );
}

export default ProfileCard;
