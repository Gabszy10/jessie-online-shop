import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadCrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
      <NavLink to="/" color="inherit" className={classes.link}>
        <HomeIcon className={classes.icon} />
        HOME
      </NavLink>
      <NavLink to="/" color="inherit" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Cart
      </NavLink>
    </Breadcrumbs>
  );
}
