import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import bg from "../../assets/images/login-bg.jpg";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ManageButton(props) {
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c804ff7-3d71-4587-8b3b-8f6d2ce4415e/dbxqunf-cc3c8c93-c02f-42f1-a46d-6c8b7fee89ca.jpg/v1/fill/w_1600,h_900,q_75,strp/dragon_ball_super_son_goku_ultra_instinct_by_drawinganimes4fun_dbxqunf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvOWM4MDRmZjctM2Q3MS00NTg3LThiM2ItOGY2ZDJjZTQ0MTVlXC9kYnhxdW5mLWNjM2M4YzkzLWMwMmYtNDJmMS1hNDZkLTZjOGI3ZmVlODljYS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.uhaIur9U6aCBeNlq7xfR6qDLyI51vtvSRrn1uwTAdiI"
        title="Paella dish"
      />
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#ff7129",
            borderRadius: "20px",
            width: "60%",
            textAlign: "center",
          }}
          onClick={() => history.push(props.to)}
        >
          {props.title}
        </Button>
      </CardContent>
    </Card>
  );
}
