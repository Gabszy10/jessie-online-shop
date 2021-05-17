import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

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
    borderColor: "#ff7129 !important",
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
      toast.success("Success");
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
            style: { color: "#ff7129" },
          }}
          id="outlined-adornment"
          label="Email"
          variant="outlined"
          color="primary"
          style={{ width: "70%", marginBottom: "1rem" }}
          type="email"
          name="email"
          InputProps={{
            classes: {
              notchedOutline:
                isFormInvalid && !userData.email
                  ? classes.notchedErrorOutline
                  : classes.notchedOutline,
            },
          }}
          error={isFormInvalid && !userData.email}
          helperText={isFormInvalid && !userData.email ? "Empty field!" : " "}
          onChange={(e) => handleChange(e)}
        />

        <TextField
          InputLabelProps={{
            style: { color: "#ff7129" },
          }}
          id="outlined-adornment"
          label="Password"
          variant="outlined"
          color="primary"
          style={{ width: "70%", marginBottom: "1rem" }}
          type="password"
          name="password"
          InputProps={{
            classes: {
              notchedOutline:
                isFormInvalid && !userData.password
                  ? classes.notchedErrorOutline
                  : classes.notchedOutline,
            },
          }}
          error={isFormInvalid && !userData.password}
          helperText={
            isFormInvalid && !userData.password ? "Empty field!" : " "
          }
          onChange={(e) => handleChange(e)}
        />
      </form>

      <div>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#ff7129",
            fontSize: "1rem",
            marginBottom: "2rem",
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default Login;
