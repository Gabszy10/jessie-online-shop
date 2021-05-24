import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
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

function Register() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const isValid = () => {
    setIsFormInvalid(true);
    if (!userData.name || !userData.email || !userData.password) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      try {
        console.log(userData);
        const res = await axios.get("https://myproject03.azurewebsites.net/api/users");
        if (res.data.some((user) => userData.email === user.email)) {
          return toast.error("Email already exist , Please try again");
        }
        await axios.post("https://myproject03.azurewebsites.net/api/users", userData);
        setUserData({
          name: "",
          email: "",
          password: "",
        });
        setIsFormInvalid(false);
        toast.success("User registered successfully! ✅");
      } catch (error) {
        toast.error("Something went wrong, Please try again. ❌");
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form action="">
        <TextField
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          id="outlined-adornment"
          label="Name"
          variant="outlined"
          color="primary"
          style={{ width: "70%", marginBottom: "0.3rem" }}
          value={userData.name}
          type="text"
          name="name"
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
          error={isFormInvalid && !userData.name}
          helperText={
            isFormInvalid && !userData.name ? "Name cannot be empty!" : " "
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
          style={{ width: "70%", marginBottom: "0.3rem" }}
          value={userData.email}
          type="email"
          name="email"
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
            isFormInvalid && !userData.email ? "Email cannot be empty!" : " "
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
          style={{ width: "70%", marginBottom: "0.3rem" }}
          value={userData.password}
          type="password"
          name="password"
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
          onChange={(e) => handleChange(e)}
        />
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            margin: "auto",
          }}
        >
          <FormControlLabel
            control={<Checkbox style={{ color: "white" }} />}
            label={
              <span>
                I have read and agree to the{" "}
                <span style={{ color: "#29d7ff" }}>Terms of Service</span>
              </span>
            }
          />
        </div>
      </form>

      <div>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#ff7129",
            fontSize: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            borderRadius: "20px",
            width: "70%",
          }}
        >
          CREATE ACCOUNT
        </Button>
      </div>
    </>
  );
}

export default Register;
