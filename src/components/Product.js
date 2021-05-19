import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box, Button } from "@material-ui/core";
import toast from "../customToast";
import { useHistory } from "react-router";

const userStorage = localStorage.getItem("user") || undefined;

const useStyles = makeStyles((theme) => ({
  root: {
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)", cursor: "pointer" },
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#202d36",
    color: "white",
    "&:hover": { backgroundColor: "#05464b" },
    fontFamily: "Otaku, Arial, serif; !important",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  media: {
    height: 80,
    paddingTop: "56.25%", // 16:9
  },
  background: {
    backgroundColor: "#ff7129",
    color: "white",
    paddingBottom: "0",
  },
  cartTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "0",
    fontFamily: "Otaku, Arial, serif; !important",
  },
  priceTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "0",
    fontFamily: "Otaku, Arial, serif; !important",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = (product) => {
    if (!userStorage) {
      history.push("/login");
      return toast.error("You must be logged in to perform this action");
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      cart[index]["qty"] += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(" Item is added to cart ✅");
  };

  return (
    <Box boxShadow={10}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.title}
        />
        <CardContent className={classes.background}>
          <Typography className={classes.cartTitle} variant="h5" gutterBottom>
            {props.product.title}
          </Typography>
          <hr />
          <Typography className={classes.priceTitle} variant="h4" gutterBottom>
            P{props.product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.background}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
            onClick={() => handleAddToCart(props.product)}
          >
            Add To Cart
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon style={{ color: "white" }} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Product Details:</Typography>
            <Typography paragraph>This product is super good!</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default Product;
