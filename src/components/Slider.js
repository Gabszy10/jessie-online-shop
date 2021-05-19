import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Container } from "@material-ui/core";

function Slider(props) {
  var items = [
    {
      name: "Naruto",
      url: "https://coverfiles.alphacoders.com/340/34076.png",
    },
    {
      name: "Random Name #2",
      url: "https://wallpapercave.com/wp/wp5640346.jpg",
    },
    {
      name: "Random Name #2",
      url: "https://cdn.wallpapersafari.com/23/29/vfwr3p.jpg",
    },
  ];

  return (
    // <Container >
      <Carousel>
        {items.map((item, i) => (
          <img
            src={item.url}
            style={{ width: "100%", objectFit: "cover", maxHeight: "280px" }}
          />
        ))}
      </Carousel>
    // </Container>
  );
}

export default Slider;
