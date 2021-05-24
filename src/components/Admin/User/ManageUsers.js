import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import customToast from "../../../customToast";
import { Button, Container } from "@material-ui/core";
import bg from "../../../assets/images/login-bg.jpg";
import axios from "axios";
import UpdateUserModal from "./UpdateUserModal";
import CreateUserModal from "./CreateUserModal";

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
    background: "#202d36",
    margin: "auto",
    textAlign: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
  },
  dangerIcon: {
    color: "#1fcbdc",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
});

export default function ManageUsers({ pages }) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [userToUpdate, setUserToUpdate] = useState();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://myproject03.azurewebsites.net/api/users"
      );
      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      customToast.error("Something went wrong, Please try again. ❌");
    }
  };

  const handleCreate = () => {
    setAction("CREATE");
    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setAction("EDIT");
    setUserToUpdate(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setAction("");
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `https://myproject03.azurewebsites.net/api/users/${id}`
        );
        fetchUsers();
        customToast.success("User succesfully deleted ✅");
      } catch (error) {
        customToast.success("Something went wrong, Please try again ❌");
      }
    }
  };

  const renderModal = () => {
    if (action === "EDIT") {
      return (
        <UpdateUserModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={userToUpdate}
          refetch={fetchUsers}
        />
      );
    } else if (action === "CREATE") {
      return (
        <CreateUserModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={userToUpdate}
          refetch={fetchUsers}
        />
      );
    }
  };

  return (
    <Container>
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#ff7129",
            borderRadius: "20px",
            width: "30%",
          }}
          onClick={handleCreate}
        >
          Create User
        </Button>

        <TableContainer
          component={Paper}
          style={{
            maxWidth: "1000px",
            margin: "auto",
            overflowX: "unset",
            backgroundColor: "#171b24",
            borderRadius: "20px",
            marginTop: "1rem",
          }}
        >
          <Table
            className={classes.table}
            aria-label="simple table"
            style={{
              overflowX: "unset",
              backgroundColor: "#171b24",
              borderRadius: "15px",
              boxShadow: "6px 10px 13px -3px rgba(0,0,0,0.75)",
              marginBottom: "1rem",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{ color: "white", borderBottom: "none" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#ff7129",
                        borderRadius: "20px",
                        width: "60%",
                      }}
                      onClick={() => handleEdit(user)}
                    >
                      Update
                    </Button>
                  </TableCell>

                  <TableCell
                    style={{ color: "white", borderBottom: "none" }}
                    align="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#b70000",
                        borderRadius: "20px",
                        width: "60%",
                      }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderModal()}
        </TableContainer>
      </div>
    </Container>
  );
}
