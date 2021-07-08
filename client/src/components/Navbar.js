import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

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
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo2: {
    backgroundColor: "#808080",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { logout } = useAuth0();

  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <Link to="./write">
          <StyledTab label="Write" />
        </Link>
        <Link to="./reply">
          <StyledTab label="Reply" />
        </Link>
        <Link to="./inbox">
          <StyledTab label="Inbox" />
        </Link>
        <Link to="./stickers">
          <StyledTab label="Stickers" />
        </Link>
        <Link to="./profile">
          <StyledTab label="Profile" />
        </Link>
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          <StyledTab label="Logout" />
        </Button>
        <Typography className={classes.padding} />
      </div>
    </div>
  );
}
