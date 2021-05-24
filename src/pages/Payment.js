import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import toast from "../customToast";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import bg from "../assets/images/login-bg.jpg";
import { formatNumber } from "../helper";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

export default function Payment() {
  const classes = useStyles();
  const history = useHistory();
  const [userData, setUserData] = useState({
    receiver: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [payment, setPayment] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const userInfoStorage = JSON.parse(localStorage.getItem("user_info"));
    computeTotal(cartStorage);
    setCart(cartStorage);
    if (userInfoStorage) {
      setUserData(userInfoStorage);
    }
  }, []);

  const handleSubmit = async () => {
    if (!payment) {
      return toast.error("Please select payment method ❌");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = mm + "-" + dd + "-" + yyyy;
      const orderNumber = uuidv4();
      await axios.post("https://myproject03.azurewebsites.net/api/orders", {
        id: orderNumber,
        user_id: user.id,
        order_date: today,
        receiver: userData.receiver,
        phone: userData.phone,
        address: `${userData.address} ${userData.city} ${userData.zip}`,
        payment_method: payment,
      });
      toast.success("Order processed succesfully");
      localStorage.clear("user_cart");
      localStorage.clear("user_info");
      history.push(`/order/confirm/${orderNumber}`);
    } catch (error) {
      toast.error("Something went wrong, Please try again.");
    }
  };

  const handleChange = (e) => {
    setPayment(e.target.value);
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
          <NavLink to="/checkout" color="inherit" className={classes.link}>
            <LocalAtmIcon className={classes.icon} />
            Payment
          </NavLink>
        </Breadcrumbs>

        <Grid container spacing={3}>
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
                  </TableBody>
                </Table>
              </div>
            </Container>
            <br />
            <Container className={classes.container}>
              <h2 style={{ color: "white" }}>YOUR SHIPPING INFO 👌</h2>
              <div style={{ margin: "auto" }}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        RECEIVER NAME
                      </TableCell>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        {userData.receiver}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        PHONE NUMBER
                      </TableCell>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        {userData.phone}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        ADDRESS
                      </TableCell>
                      <TableCell
                        style={{ color: "white", borderBottom: "none" }}
                        align="center"
                        width="50%"
                      >
                        {userData.address} {userData.city} {userData.zip}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </div>
            </Container>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Container className={classes.container}>
              <h2 style={{ color: "white" }}>PAYMENT METHODS 💰</h2>
              <FormControl component="fieldset" style={{ color: "white" }}>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Cash on Delivery"
                    control={<Radio style={{ color: "#ff7129" }} />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="Gcash"
                    control={<Radio style={{ color: "#ff7129" }} />}
                    label="Gcash"
                  />
                  <FormControlLabel
                    value="Paymaya"
                    control={<Radio style={{ color: "#ff7129" }} />}
                    label="Paymaya"
                  />
                  <FormControlLabel
                    value="Bank Transfer"
                    control={<Radio style={{ color: "#ff7129" }} />}
                    label="Bank Transfer"
                  />
                  <FormControlLabel
                    value="Paypal"
                    control={<Radio style={{ color: "#ff7129" }} />}
                    label="Paypal"
                  />
                </RadioGroup>
              </FormControl>
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
