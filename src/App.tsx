import React, { useEffect, useState } from "react";
import Slider from "./components/Slider";

function App() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await fetch("http://localhost:3001/images");

    const data = await res.json();

    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Slider title="Carousel" slides={images} />
    </>
  );
}

export default App;
