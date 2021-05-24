import { Grid } from "@material-ui/core";
import React from "react";
import ManageButton from "../components/Admin/ManageButton";

function AdminHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <ManageButton title="Manage Users" to="/admin/users" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ManageButton title="Manage Products" to="/admin/products" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ManageButton title="Manage Orders" to="/admin/orders" />
      </Grid>
    </Grid>
  );
}

export default AdminHome;
