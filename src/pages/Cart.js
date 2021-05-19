import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CartTable from "../components/CartTable";
import { Breadcrumbs } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    maxWidth: 1350,
    margin: "auto",
  },
  link: {
    display: "flex",
    color: "white",
    textDecoration: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
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
        <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
          <NavLink to="/" color="inherit" className={classes.link}>
            <HomeIcon className={classes.icon} />
            HOME
          </NavLink>
          <NavLink to="/" color="inherit" className={classes.link}>
            <ShoppingCartIcon className={classes.icon} />
            Cart
          </NavLink>
        </Breadcrumbs>
        <CartTable pages={["cart"]} />
      </div>
    </>
  );
}
