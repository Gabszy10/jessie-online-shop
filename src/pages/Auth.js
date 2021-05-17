import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import Login from "../components/Login";
import Register from "../components/Register";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  tab: {
    background: "#ff7129",
  },
}));

function Auth() {
  const classes = useStyles();
  const [login, setLogin] = useState(true);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Container style={{ maxWidth: "700px", marginTop: "2rem" }}>
        <AppBar position="static" color="default">
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: "#00ffdc" } }}
            value={login}
            onChange={() => "haha"}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            className={classes.tab}
            style={{ maxWidth: "700px" }}
          >
            <Tab
              label="Register"
              {...a11yProps(2)}
              onClick={() => setLogin(0)}
              style={{ color: "white", fontSize: "1.2rem" }}
            />
            <Tab
              label="Login"
              {...a11yProps(1)}
              onClick={() => setLogin(1)}
              style={{ color: "white", fontSize: "1.2rem" }}
            />
          </Tabs>
        </AppBar>

        <Box
          boxShadow={100}
          style={{ backgroundColor: "white", border: "3px solid #ff7129;" }}
        >
          {login ? (
            <h1
              style={{
                textAlign: "center",
                color: "#ff7129",
                margin: "0",
                paddingTop: "1rem",
                fontSize: "2.5rem",
              }}
            >
              Sign in with
            </h1>
          ) : (
            <h1
              style={{
                textAlign: "center",
                color: "#ff7129",
                margin: "0",
                paddingTop: "1rem",
                fontSize: "2.5rem",
              }}
            >
              Sign up with
            </h1>
          )}

          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            {login ? <Login /> : <Register />}
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Auth;
