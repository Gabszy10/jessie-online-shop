import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import bg from "../assets/images/login-bg.jpg";
import { formatNumber } from "../helper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    maxWidth: 1350,
    margin: "auto",
  },
  container: {
    width: "90%",
    margin: "auto",
    overflowX: "unset",
    backgroundColor: "#171b24",
    borderRadius: "20px",
    textAlign: "center",
    padding: "2rem 0 2rem 0",
    boxShadow: "6px 10px 13px -3px rgba(0,0,0,0.75)",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
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
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#ccc !important",
  },
  notchedErrorOutline: {
    borderWidth: "3px",
    borderColor: "#f65242 !important",
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const history = useHistory();
  const [userData, setUserData] = useState({
    receiver: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    computeTotal(cartStorage);
    setCart(cartStorage);
  }, []);

  const isValid = () => {
    setIsFormInvalid(true);
    if (
      !userData.receiver ||
      !userData.phone ||
      !userData.address ||
      !userData.city ||
      !userData.zip
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      localStorage.setItem("user_info", JSON.stringify(userData));
      history.push("/payment");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const computeTotal = (items) => {
    const getTotal = items.reduce((n, { price, qty }) => n + price * qty, 0);
    setTotal(getTotal);
  };

  return (
    <>
      <div className={classes.root}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ color: "white", marginBottom: "2rem" }}
        >
          <NavLink to="/" color="inherit" className={classes.link}>
            <HomeIcon className={classes.icon} />
            HOME
          </NavLink>
          <NavLink to="/cart" color="inherit" className={classes.link}>
            <ShoppingCartIcon className={classes.icon} />
            Cart
          </NavLink>
          <NavLink to="/checkout" color="inherit" className={classes.link}>
            <WhatshotIcon className={classes.icon} />
            Checkout
          </NavLink>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Container className={classes.container}>
              <form action="">
                <h2 style={{ color: "white" }}>SHIPPING FORM 💪</h2>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Receiver Name"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%", marginBottom: "0.4rem" }}
                  type="text"
                  name="receiver"
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.receiver
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.receiver}
                  helperText={
                    isFormInvalid && !userData.receiver
                      ? "Receiver name cannot be empty!"
                      : " "
                  }
                  onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Contact Number"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%", marginBottom: "0.4rem" }}
                  type="text"
                  name="phone"
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.phone
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.phone}
                  helperText={
                    isFormInvalid && !userData.phone
                      ? "Contact Number cannot be empty!"
                      : " "
                  }
                  onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Address"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%", marginBottom: "0.4rem" }}
                  type="text"
                  name="address"
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.address
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.address}
                  helperText={
                    isFormInvalid && !userData.address
                      ? "Address cannot be empty!"
                      : " "
                  }
                  onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Town / City"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%", marginBottom: "0.4rem" }}
                  type="text"
                  name="city"
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.city
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.city}
                  helperText={
                    isFormInvalid && !userData.city
                      ? "City cannot be empty!"
                      : " "
                  }
                  onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Post Code / Zip"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%", marginBottom: "0.4rem" }}
                  type="text"
                  name="zip"
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.zip
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.zip}
                  helperText={
                    isFormInvalid && !userData.zip
                      ? "Zip Code cannot be empty!"
                      : " "
                  }
                  onChange={(e) => handleChange(e)}
                />
              </form>
            </Container>
          </Grid>
          <Grid md={1}></Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Container className={classes.container}>
              <h2 style={{ color: "white" }}>YOUR ORDER 👌</h2>

              <div style={{ margin: "auto" }}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        PRODUCT NAME
                      </TableCell>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        TOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.length &&
                      cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell
                            style={{ color: "white", borderBottom: "none" }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {item.title} {item.qty}x
                          </TableCell>
                          <TableCell
                            style={{ color: "white", borderBottom: "none" }}
                            align="center"
                          >
                            {formatNumber(item.price * item.qty)}
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <b style={{ fontFamily: "Roboto", fontSize: "1rem" }}>
                          Cart Total
                        </b>
                      </TableCell>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                      >
                        <b style={{ fontFamily: "Roboto", fontSize: "1rem" }}>
                          {formatNumber(total)}
                        </b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Container>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ff7129",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "20px",
                  width: "60%",
                  marginTop: "2rem",
                }}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
