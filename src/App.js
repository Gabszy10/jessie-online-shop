import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth";

function App(props) {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} transition={Flip} />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
