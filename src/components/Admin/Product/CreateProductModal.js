import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Divider, TextField } from "@material-ui/core";
import axios from "axios";
import customToast from "../../../customToast";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "start",
    marginTop: "8rem",
    justifyContent: "center",
  },
  paper: {
    minWidth: "600px",
    backgroundColor: "#0f1023",
    marginRight: "-5%",
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: 200,
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

export default function CreateUserModal(props) {
  const {isOpen, closeModal, refetch } = props;
  const classes = useStyles();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const isValid = () => {
    setIsFormInvalid(true);
    if (!productData.title || !productData.price) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      try {
        await axios.post(`https://myproject03.azurewebsites.net/api/products`, {
          title: productData.title,
          price: parseInt(productData.price),
        });
        closeModal();
        refetch();
        customToast.success("Product created succesfully. ✅");
      } catch (error) {
        customToast.error("Something went wrong, Please try again. ❌");
      }
    }
  };

  const handleClose = () => {
    setIsFormInvalid(false);
    closeModal();
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen} style={{ backgroundColor: "#0f1023", color: "#FFF" }}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
              🖕🏽 CREATE PRODUCT 🖕🏽
            </h2>
            <form form autoComplete="off" style={{ textAlign: "center" }}>
              <TextField
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                id="outlined-adornment"
                label="Title"
                variant="outlined"
                color="primary"
                style={{ width: "80%", marginBottom: "0.3rem" }}
                type="text"
                name="title"
                value={productData.title}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !productData.title
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !productData.title}
                helperText={
                  isFormInvalid && !productData.title
                    ? "Title cannot be empty!"
                    : " "
                }
                onChange={(e) => handleChange(e)}
              />

              <TextField
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                id="outlined-adornment"
                label="Price"
                variant="outlined"
                color="primary"
                style={{ width: "80%", marginBottom: "0.3rem" }}
                type="text"
                name="price"
                value={productData.price}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !productData.price
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !productData.price}
                helperText={
                  isFormInvalid && !productData.price
                    ? "Price cannot be empty!"
                    : " "
                }
                onChange={(e) => handleChange(e)}
              />
            </form>
            <Divider />
            <div style={{ float: "right", marginTop: "0.5rem" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ff7129",
                  borderRadius: "20px",
                  width: "20%",
                  marginRight: "1rem",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ff7129",
                  borderRadius: "20px",
                  width: "20%",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
