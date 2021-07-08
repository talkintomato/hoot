import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Button, Card, makeStyles, Typography, Divider, TextField } from "@material-ui/core";
import Axios from 'axios';

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
  console.log(props.data[0]);
  const user = props.data[0];
  const classes = UseStyles();
  const [edit, setEdit] = useState(false);
  const [username, setusername] = useState(user.username)

  const changeName = () => {
    Axios.put('http://localhost:5000/users/' + user.id, {
      username: username,
    }).then((() => { console.log("success"); setEdit(false) }));
  }

  return (
    <Card className={classes.profileBox}>
      {!edit ?
        <>
          <Typography className={classes.profileName}>{user.username}</Typography>
          <Typography className={classes.accountDetails}> Email: {user.email}
          </Typography>
          <Button variant="outlined" size="small" onClick={() => { setEdit(true); }}>
            Edit
          </Button>
        </> :
        <>
          <TextField defaultValue={user.username} onChange={(event) => { setusername(event.target.value) }} type="search" variant="outlined" />
          <Button variant="outlined" size="small" onClick={() => { changeName(); }}>
            Confirm
          </Button>
          <Button variant="outlined" size="small" onClick={() => setEdit(false)}>
            cancel
          </Button>
        </>
      }


      <Divider className={classes.divider} />
      <Typography className={classes.profileBody}>
        HOOTS: {user.post_count}
        <br />
        ANSWERS: {user.reply_count}
        <br />
        STICKERS: {user.sticker_count}
        <br />
        {/* LEVEL: {"noob"} */}
      </Typography>

    </Card>
  );
}

export default ProfileCard;
