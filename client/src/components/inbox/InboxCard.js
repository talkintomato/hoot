import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { UserContext } from '../UserContext';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: "100",
        margin: "100px",
        background: "#000",
        opacity: "70%",
    },
    title: {
        fontSize: 40,
        color: "#FFF",
    },
    pos: {
        marginBottom: 12,
    },
    divider: {
        width: '100%',
        backgroundColor: "#ffff",
    },
    messagePrev: {
        marginTop: " 30px",
        padding: "20px",
        justifyContent: "flex-start",
    },
    compose: {
        height: "100%",
        margin: "10px",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    unread: {
        backgroundColor: "#FF0000"
    }
});

export default function InboxCard(props) {
    const classes = useStyles();
    // console.log(props.data);

    const userId = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loaded, setLoaded] = useState(false); 
  
    useEffect(() =>  {
      const fetchData = async () => {
        const res = await Axios.get('http://localhost:5000/inbox/' + userId)
        setUserPosts(res.data);
        setLoaded(true);
      }
      fetchData();
      }, [props.replyView])
      

    return (
        <Card className={classes.root}>
            <CardContent className={classes.header}>
                <Typography className={classes.title} gutterBottom>
                    Hoots
        </Typography>
            </CardContent>
            <CardContent>
                <Divider className={classes.divider} />
                {userPosts.map((posts) => (
                    <Button  variant="contained" className={classes.messagePrev} fullWidth onClick={() => props.selectIndex(posts.id)} endIcon={posts.unread > 0? <Avatar classname={classes.unread}> { posts.unread }</Avatar> : null} > {posts.content} </Button>
                ))}
            </CardContent>
        </Card>
    );
}