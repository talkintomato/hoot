import React from "react";
import {
  Button,
  Card,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  profileBox: {
    padding: "20px",
    borderStyle: "dotted",
    borderColor: "#13C7C2",
    background: "#D8ECEC",
  },
  profileName: {
    fontSize: 40,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
  profileBody: {
    fontSize: 20,
    fontFamily: "Comfortaa",
    fontWeight: "normal",
  },
  accountDetails: {
    fontSize: 17,
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    color: "#A6A6A6",
    marginBottom: 10,
  },
  divider: {
    width: "100%",
    padding: 1,
    margin: "10px",
    background: "#AFE1DB",
  },
  settingsButton: {
    fontSize: 10,
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    textTransform: "none",
  },
});

function ProfileCard(props) {
  const user = props.data;
  const classes = useStyles();

  return (
    <Card className={classes.profileBox}>
      <Typography className={classes.profileName}>{user.username}</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.profileBody}>
        You have {user.hoot_count} hoots and {user.reply_count} hootbacks.
        <br />
        Your current level: {"noob"}
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.accountDetails}>
        Account Details: <br />
        Username: {user.username}
        <br />
        Email: {user.email}
        <br />
      </Typography>
      <Button variant="outlined" size="small" endIcon={<SettingsIcon />}>
        <Typography className={classes.settingsButton}>
          profile settings
        </Typography>
      </Button>
    </Card>
  );
}

export default ProfileCard;
