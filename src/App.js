import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth";
import Cart from "./pages/Cart";
import "./assets/styles/Footer.css";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirm from "./pages/Confirm";
import AdminHome from "./pages/AdminHome";

const RouteWithNavbar = ({ exact, path, component: Component, ...rest }) => {
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return (
          <>
            <Navbar {...routeProps} />
            <Component {...routeProps} />
          </>
        );
      }}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={3000}
        transition={Flip}
        className="toast-container"
        toastClassName="dark-toast"
        position="bottom-right"
      />

      <Switch>
        <RouteWithNavbar path="/" exact component={Home} />
        <RouteWithNavbar path="/login" exact component={Login} />
        <RouteWithNavbar path="/cart" exact component={Cart} />
        <RouteWithNavbar path="/checkout" exact component={Checkout} />
        <RouteWithNavbar path="/payment" exact component={Payment} />
        <RouteWithNavbar path="/order/confirm/:id" exact component={Confirm} />
        <Route path="/admin" exact component={AdminHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
