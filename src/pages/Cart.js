import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "../components/Slider";
import BreadCrumbs from "../components/BreadCrumbs";
import CartTable from "../components/CartTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    maxWidth: 1350,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Cart() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <BreadCrumbs />
        <CartTable />
      </div>
    </>
  );
}
