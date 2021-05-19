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
import { NavLink } from "react-router-dom";
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
    marginTop: "1rem",
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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    computeTotal(cartStorage);
    setCart(cartStorage);
  }, []);

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
                  style={{ width: "80%" }}
                  type="text"
                  name="name"
                  helperText=" "
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.password
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.password}
                  helperText={
                    isFormInvalid && !userData.password
                      ? "Password cannot be empty!"
                      : " "
                  }
                  //   onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Contact Number"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%" }}
                  type="text"
                  name="name"
                  helperText=" "
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.password
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.password}
                  helperText={
                    isFormInvalid && !userData.password
                      ? "Password cannot be empty!"
                      : " "
                  }
                  //   onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Address"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%" }}
                  type="text"
                  name="address"
                  helperText=" "
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.password
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.password}
                  helperText={
                    isFormInvalid && !userData.password
                      ? "Password cannot be empty!"
                      : " "
                  }
                  //   onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Town / City"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%" }}
                  type="text"
                  name="address"
                  helperText=" "
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.password
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.password}
                  helperText={
                    isFormInvalid && !userData.password
                      ? "Password cannot be empty!"
                      : " "
                  }
                  //   onChange={(e) => handleChange(e)}
                />

                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  id="outlined-adornment"
                  label="Post Code / Zip"
                  variant="outlined"
                  color="primary"
                  style={{ width: "80%" }}
                  type="text"
                  name="address"
                  helperText=" "
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    classes: {
                      notchedOutline:
                        isFormInvalid && !userData.password
                          ? classes.notchedErrorOutline
                          : classes.notchedOutline,
                    },
                  }}
                  error={isFormInvalid && !userData.password}
                  helperText={
                    isFormInvalid && !userData.password
                      ? "Password cannot be empty!"
                      : " "
                  }
                  //   onChange={(e) => handleChange(e)}
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
              >
                <NavLink
                  to="/checkout"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Continue
                </NavLink>
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
