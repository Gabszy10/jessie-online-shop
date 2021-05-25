import React from "react";
import Carousel from "react-material-ui-carousel";

function Slider(props) {
  var items = [
    {
      name: "Naruto",
      url: "goku.png",
    },
    {
      name: "Random Name #2",
      url: "anime.jpg",
    },
    {
      name: "Random Name #2",
      url: "34076.png",
    },
  ];

  return (
    // <Container >
    <Carousel>
      {items.map((item, i) => (
        <img
          key={i}
          alt="Slider"
          src={require(`../assets/images/cover/${item.url}`).default}
          style={{ width: "100%", objectFit: "cover", maxHeight: "280px" }}
        />
      ))}
    </Carousel>
    // </Container>
  );
}

export default Slider;
