import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Product from "../components/Product";
import Slider from "../components/Slider";
import { Container } from "@material-ui/core";
import axios from "axios";
import customToast from "../customToast";

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

export default function Home() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://myproject03.azurewebsites.net/api/products"
      );

      if (res) {
        setProducts(res.data);
      }
    } catch (error) {
      customToast.error("Something went wrong, Please try again. ❌");
    }
  };

  return (
    <>
      <Slider />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Product product={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
