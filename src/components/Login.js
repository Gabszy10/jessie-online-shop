import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import toast from "../customToast";
import { users } from "../data/db.json";
import { useHistory } from "react-router-dom";

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

function Login() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const isValid = () => {
    setIsFormInvalid(true);
    if (!userData.email || !userData.password) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      const found = users.filter((user) => user.email === userData.email);
      if (found.length) {
        if (found[0].password === userData.password) {
          localStorage.setItem("user", found);
          toast.success("Logged in succesfully");
          window.location.href = "/";
        } else {
          toast.error("Email and Password does not match ❌");
        }
      } else {
        toast.error("User doesn't exist ❌");
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form autoComplete="off">
        <TextField
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          id="outlined-adornment"
          label="Email"
          variant="outlined"
          color="primary"
          style={{ width: "70%", marginBottom: "0.3rem" }}
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
            marginBottom: "1rem",
          }}
        >
          <FormControlLabel
            control={<Checkbox style={{ color: "white" }} />}
            label="Remember me"
          />

          <h3
            style={{ cursor: "pointer", color: "#29d7ff" }}
            onClick={() => toast.success("Coming soon !")}
          >
            Forgot password?
          </h3>
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
            marginBottom: "1rem",
            borderRadius: "20px",
            width: "70%",
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default Login;
