import { Card, Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import React, {useContext} from 'react';
import { UserContext } from '../UserContext';

const useStyles = makeStyles({
  main: {
    width: "80%",
    minHeight: 275,
    padding: 20,
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "20px",
    background: "rgba(00, 00, 00, 0.7)",
  },
  title: {
    fontSize: 28,
    color: "white",
  },
  divider: {
    width: "100%",
    padding: 1,
    marginTop: "10px",
    marginBottom: "10px",
  },
  footer: {
    fontSize: 8,
  },
});

function Stickers() {
  const classes = useStyles();
  const stickers = [];
  // eslint-disable-next-line no-lone-blocks
  {
    for (let i = 1; i <= 9; i++) {
      stickers.push(i);
    }
  }
  console.log(stickers);
  return (
    <>
      <h1> Stickers </h1>
      <Card className={classes.main}>
        <Typography className={classes.title}>My Collection!</Typography>
        <Divider className={classes.divider} />
        <Grid container>
          {stickers.map((sticker) => {
            const source = `./stickerspack1/${sticker}.png`;
            return (
              <Grid item key={sticker} xs={2}>
                <img src={source} alt=" " />
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <a
        className={classes.footer}
        href="https://www.freepik.com/free-photos-vectors/flower"
      >
        Flower vector created by rawpixel.com - www.freepik.com
      </a>
    </>
  );
}

export default Stickers;
