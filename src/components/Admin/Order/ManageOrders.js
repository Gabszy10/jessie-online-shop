import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import customToast from "../../../customToast";
import { Button, Container } from "@material-ui/core";
import bg from "../../../assets/images/login-bg.jpg";
import axios from "axios";
import UpdateProductModal from "./UpdateOrderModal";
import CreateProductModal from "./CreateOrderModal";

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
    background: "#202d36",
    margin: "auto",
    textAlign: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
  },
  dangerIcon: {
    color: "#1fcbdc",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
});

export default function ManageOrders({ pages }) {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [productToUpdate, setproductToUpdate] = useState();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://myproject03.azurewebsites.net/api/orders"
      );
      if (res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      customToast.error("Something went wrong, Please try again. ❌");
    }
  };

  const handleCreate = () => {
    setAction("CREATE");
    setIsOpen(true);
  };

  const handleEdit = (product) => {
    setAction("EDIT");
    setproductToUpdate(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setAction("");
    setIsOpen(false);
  };

  const renderModal = () => {
    if (action === "EDIT") {
      return (
        <UpdateProductModal
          isOpen={isOpen}
          closeModal={closeModal}
          product={productToUpdate}
          refetch={fetchOrders}
        />
      );
    } else if (action === "CREATE") {
      return (
        <CreateProductModal
          isOpen={isOpen}
          closeModal={closeModal}
          product={productToUpdate}
          refetch={fetchOrders}
        />
      );
    }
  };

  return (
    <Container>
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
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
              <TableRow>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Order Number
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Receiver Name
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Payment Method
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((order, i) => (
                <TableRow>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {i}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    JS-{order.id}00
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {order.receiver}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {order.phone}
                  </TableCell>

                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {order.payment_method}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {order.order_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderModal()}
        </TableContainer>
      </div>
    </Container>
  );
}
