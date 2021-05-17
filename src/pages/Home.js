import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Product from "../components/Product";
import Carousel from "react-material-ui-carousel";
import Slider from "../components/Slider";
import { products } from "../data/db.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    maxWidth: 1300,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Slider />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <Product product={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
