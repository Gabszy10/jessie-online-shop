import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Tab, AppBar, Box, Grid } from "@material-ui/core";
import Login from "../components/Login";
import Register from "../components/Register";
import WelcomeImage from "../components/WelcomeImage";
import logo from "../assets/images/goku.png";
import bg from "../assets/images/login-bg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  form: {
    flexGrow: 1,
  },
  tab: {
    background: "#ff7129",
  },
}));

function Auth() {
  const classes = useStyles();
  const [login, setLogin] = useState(true);

  return (
    <>
      <Container style={{ maxWidth: "1200px", margin: "2rem auto 2rem auto" }}>
        <Box
          boxShadow={100}
          style={{
            backgroundColor: "white",
            border: "3px solid #ff7129;",
            minHeight: "570px",
            borderRadius: "20px",
          }}
        >
          <div className={classes.form}>
            <Grid container style={{ height: "570px" }}>
              <Grid item md={6}>
                <WelcomeImage />
              </Grid>
              <Grid
                item
                md={6}
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  borderRadius: "0px 20px 20px 0px",
                }}
              >
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <img
                    src={logo}
                    height="100"
                    width="150"
                    style={{
                      marginBottom: "1.5rem",
                    }}
                  />
                  {login ? (
                    <>
                      {" "}
                      <Login />
                      <h3 style={{ color: "white" }}>
                        Don't have an account?
                        <span
                          style={{ color: "#ff7129", cursor: "pointer" }}
                          onClick={() => setLogin(false)}
                        >
                          {" "}
                          Sign up
                        </span>
                      </h3>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Register />
                      <h3 style={{ color: "white" }}>
                        Already have an account?
                        <span
                          style={{ color: "#ff7129", cursor: "pointer" }}
                          onClick={() => setLogin(true)}
                        >
                          {" "}
                          Sign in
                        </span>
                      </h3>{" "}
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default Auth;
