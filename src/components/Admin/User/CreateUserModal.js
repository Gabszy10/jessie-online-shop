import React, { useEffect, useState } from "react";
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
    backgroundColor: theme.palette.background.paper,
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
  const { user, isOpen, closeModal, refetch } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({
    name: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const isValid = () => {
    setIsFormInvalid(true);
    var re = /\S+@\S+\.\S+/;
    if (!userData.password.value || !userData.name.value) {
      return false;
    }
    if (!userData.email.value) {
      setUserData({
        ...userData,
        email: { ...userData.email, error: "Email cannot be empty!" },
      });
      return false;
    }

    if (!re.test(userData.email.value)) {
      setUserData({
        ...userData,
        email: { ...userData.email, error: "Email must be valid email!" },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      try {
        await axios.post(`https://myproject03.azurewebsites.net/api/users`, {
          name: userData.name.value,
          email: userData.email.value,
          password: userData.password.value,
        });
        closeModal();
        refetch();
        customToast.success("User created succesfully. ✅");
      } catch (error) {
        customToast.error("Something went wrong, Please try again. ❌");
      }
    }
  };

  const handleClose = () => {
    setIsFormInvalid(false);
    closeModal();
    setOpen(false);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: { value: e.target.value, error: "" },
    });
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
              🖕🏽 CREATE USER 🖕🏽
            </h2>
            <form form autoComplete="off" style={{ textAlign: "center" }}>
              <TextField
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                id="outlined-adornment"
                label="Name"
                variant="outlined"
                color="primary"
                style={{ width: "80%", marginBottom: "0.3rem" }}
                type="text"
                name="name"
                value={userData.name.value}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !userData.name.value
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !userData.name.value}
                helperText={
                  isFormInvalid && !userData.name.value
                    ? "Name cannot be empty!"
                    : " "
                }
                onChange={(e) => handleChange(e)}
              />
              <TextField
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                id="outlined-adornment"
                label="Email"
                variant="outlined"
                color="primary"
                style={{ width: "80%", marginBottom: "0.3rem" }}
                type="email"
                name="email"
                value={userData.email.value}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && userData.email.error
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && userData.email.error}
                helperText={
                  isFormInvalid && userData.email.error
                    ? userData.email.error
                    : " "
                }
                onChange={(e) => handleChange(e)}
              />

              <TextField
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                id="outlined-adornment"
                label="Password"
                variant="outlined"
                color="primary"
                style={{ width: "80%", marginBottom: "0.3rem" }}
                type="password"
                name="password"
                value={userData.password.value}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !userData.password.value
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !userData.password.value}
                helperText={
                  isFormInvalid && !userData.password.value
                    ? "Password cannot be empty!"
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
