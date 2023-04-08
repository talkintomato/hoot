import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "react-cookie";

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 100,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#D8ECEC",
  },
  padding: {
    padding: theme.spacing(1),
  },
  label: {
    fontFamily: "Comfortaa",
    fontWeight: "normal",
    fontSize: 18,
    color: "black",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [value, setValue] = React.useState(0);
  // const { logout } = useAuth0();
  const logOut = () => {
    console.log("User is logging out");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Link to="./write">
        <StyledTab className={classes.label} label="Write" />
      </Link>
      <Link to="./hootbox">
        <StyledTab className={classes.label} label="Hootbox" />
      </Link>
      <Link to="./inbox">
        <StyledTab className={classes.label} label="Inbox" />
      </Link>
      {/* <Link to="./stickers">
        <StyledTab className={classes.label} label="Stickers" />
      </Link> */}
      <Link to="./profile">
        <StyledTab className={classes.label} label="Profile" />
      </Link>
      <Button onClick={logOut}>
        <StyledTab className={classes.label} label="Logout" />
      </Button>
      <Typography className={classes.padding} />
    </div>
  );
}
