import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//give style to game bord's button
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: 'linear-gradient(45deg, #0ead93 20%, #07ebc6 90%)',
    padding: theme.spacing(1),
    textAlign: "center",
    width: 100,
    height: 100,
  },
}));

//game bord's button
export default function Square(props) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      className={classes.paper}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
}

