import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App(props) {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} transition={Flip} />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
