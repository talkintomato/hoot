import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 10,
    padding: 15.
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    padding: 10,
    margin: 10.
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <Typography> 
        Hoot
      </Typography>
      <Typography>
        Login
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Username" variant="outlined" /> 
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Password" variant="outlined" /> 
      </form>
      <Button variant="contained" size="medium" color="primary" className={classes.button}>
        Login
      </Button>
      <Button variant="contained" size="medium" color="primary" className={classes.button}>
        Sign Up
      </Button>
    </Card>
  );
}
