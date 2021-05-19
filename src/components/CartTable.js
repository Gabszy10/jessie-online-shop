import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TrashIcon from "@material-ui/icons/Delete";
import { formatNumber } from "../helper";
import customToast from "../customToast";
import { Button, Container } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import bg from "../assets/images/login-bg.jpg";

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
    background: "#202d36",
    margin: "auto",
    textAlign: "center",
    backgroundImage: `url(${bg})`,
   
  },
  dangerIcon: {
    color: "#1fcbdc",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
});

export default function CartTable({ pages }) {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    computeTotal(cartStorage);
    setCart(cartStorage);
  }, []);

  const handleRemoveToCart = (id) => {
    if (window.confirm("Are you sure you want to remove this from the cart?")) {
      let newCart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      computeTotal(newCart);
      setCart(newCart);
      customToast.success("Item succesfully removed ✅");
    }
  };

  const computeTotal = (items) => {
    const getTotal = items.reduce((n, { price, qty }) => n + price * qty, 0);
    setTotal(getTotal);
  };

  return (
    <Container>
      <TableContainer
        component={Paper}
        style={{
          maxWidth: "1000px",
          margin: "auto",
          overflowX: "unset",
          backgroundColor: "#171b24",
          borderRadius: "20px",
          marginTop: "1rem",
        }}
      >
        <Table
          className={classes.table}
          aria-label="simple table"
          style={{
            overflowX: "unset",
            backgroundColor: "#171b24",
            borderRadius: "15px",
            boxShadow: "6px 10px 13px -3px rgba(0,0,0,0.75)",
            marginBottom: "1rem",
          }}
        >
          <TableHead>
            {!!cart.length && (
              <TableRow>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                ></TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Unit Price
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Total
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                ></TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {cart.length ? (
              cart.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <img
                      src={row.img}
                      height="75"
                      width="80"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {row.qty}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    &#8369;{formatNumber(row.price)}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    &#8369;{formatNumber(row.price * row.qty)}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                    onClick={() => handleRemoveToCart(row.id)}
                  >
                    <TrashIcon className={classes.dangerIcon} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell
                style={{ color: "white", borderBottom: "none" }}
                colSpan="5"
                align="center"
              >
                <h1>Your cart is empty 😢</h1>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#ff7129",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "20px",
                  }}
                >
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Back to Shopping
                  </NavLink>
                </Button>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {cart.length && (
        <>
          <div
            style={{
              display: "flex",
              maxWidth: "1000px",
              justifyContent: "flex-end",
              margin: "auto",
            }}
          >
            <h2 style={{ fontKerning: "none", color: "white" }}>
              Total: &#8369;{formatNumber(total)}
            </h2>
          </div>

          <div
            style={{
              maxWidth: "1000px",
              display: "flex",
              margin: "auto",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ff7129",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Back to shop
                </NavLink>
              </Button>
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ff7129",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <NavLink
                  to="/checkout"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Continue
                </NavLink>
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
