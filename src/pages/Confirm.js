import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Container,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import bg from "../assets/images/login-bg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    maxWidth: 1350,
    margin: "auto",
    textAlign: "center",
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
}));

export default function Confirm(props) {
  const classes = useStyles();
  const [orderDetails, setOrderDetails] = useState(undefined);

  useEffect(() => {
    fetchOrder();
  });

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `https://myproject03.azurewebsites.net/api/orders/${props.match.params.id}`
      );
      setOrderDetails(res.data);
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.root}>
        <h1 style={{ color: "white", fontSize: "3rem", fontKerning: "none" }}>
          Thank You! 💖 🙌 💖
        </h1>
        <h3 style={{ color: "white", fontSize: "1.5rem", fontKerning: "none" }}>
          Your order has been processed.
        </h3>
        <h3 style={{ color: "white", fontSize: "1.5rem", fontKerning: "none" }}>
          Please allow up to 2 business days ( excluding{" "}
          <span style={{ color: "#ff7129" }}>
            weekends, holidays, and sale days
          </span>{" "}
          ) to process and ship your order.
        </h3>

        {orderDetails && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Container className={classes.container}>
                <h2 style={{ color: "white" }}>ORDER DETAILS 🥳</h2>
                <div style={{ margin: "auto" }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          ORDER NUMBER
                        </TableCell>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          JS-{orderDetails.id.substr(0, 5)}
                        </TableCell>
                      </TableRow>
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
                          {orderDetails.receiver}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          CONTACT NUMBER
                        </TableCell>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          {orderDetails.phone}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          CREATED DATE
                        </TableCell>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          {orderDetails.order_date}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          PAYMENT METHOD
                        </TableCell>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          {orderDetails.payment_method.toUpperCase()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          DELIVERY ADDRESS
                        </TableCell>
                        <TableCell
                          style={{ color: "white", borderBottom: "none" }}
                          align="center"
                          width="50%"
                        >
                          {orderDetails.address} {orderDetails.city}{" "}
                          {orderDetails.zip}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} sm={12} md={3}></Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
