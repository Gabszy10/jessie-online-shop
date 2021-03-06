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

export default function UpdateUserModal(props) {
  const { user, isOpen, closeModal, refetch } = props;
  const classes = useStyles();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email,
        name: user.name,
        password: user.password,
      });
    }
  }, [user]);

  const isValid = () => {
    setIsFormInvalid(true);
    if (!userData.email || !userData.name) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      try {
        await axios.put(
          `https://myproject03.azurewebsites.net/api/users/${user.id}`,
          userData
        );
        closeModal();
        refetch();
        customToast.success("User updated succesfully. ✅");
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
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
              🖕🏽 UPDATE USER 🖕🏽
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
                value={userData.name}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !userData.name
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !userData.email}
                helperText={
                  isFormInvalid && !userData.email
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
                value={userData.email}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                  classes: {
                    notchedOutline:
                      isFormInvalid && !userData.email
                        ? classes.notchedErrorOutline
                        : classes.notchedOutline,
                  },
                }}
                error={isFormInvalid && !userData.email}
                helperText={
                  isFormInvalid && !userData.email
                    ? "Email cannot be empty!"
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
