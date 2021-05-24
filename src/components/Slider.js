import React from "react";
import Carousel from "react-material-ui-carousel";

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
      url: "https://wallpapercave.com/uwp/uwp943060.jpeg",
    },
  ];

  return (
    // <Container >
    <Carousel>
      {items.map((item, i) => (
        <img
          key={i}
          alt="Slider"
          src={item.url}
          style={{ width: "100%", objectFit: "cover", maxHeight: "280px" }}
        />
      ))}
    </Carousel>
    // </Container>
  );
}

export default Slider;
