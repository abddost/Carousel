import React from "react";

interface IProp {
  title: string;
  slides: Array<any>;
}

const Slider = ({ title, slides }: IProp) => {
  const [slideNumber, setSlideNumber] = React.useState(0);
  const sliderRef = React.useRef<any>(null);

  const navigationHandle = (direction: string) => {
    let newSlideNumber;
    const totalNoofSlides = sliderRef?.current.children.length - 1;

    direction === "left"
      ? (newSlideNumber = slideNumber === 0 ? totalNoofSlides : slideNumber - 1)
      : (newSlideNumber =
          slideNumber === totalNoofSlides ? 0 : slideNumber + 1);
    setSlideNumber(newSlideNumber);

    Array.from(sliderRef?.current.children).forEach((slide: any) =>
      slide.classList.remove("active")
    );
    sliderRef.current.children[newSlideNumber].classList.add("active");

    document.body.style.backgroundImage = `url(${slides[newSlideNumber].source})`;
  };

  if (slides.length <= 0) {
    return <div>"No slides available.."</div>;
  }

  return (
    <div className="sliderWrapper">
      {title && <h3 className="sliderTitle">{title}</h3>}
      <button
        className="prevArrow"
        onClick={() => navigationHandle("left")}
        disabled={slideNumber === 0}
      >
        «
      </button>
      <div className="slider" ref={sliderRef}>
        {slides.map((slide: any, index: number) => (
          <div
            key={slide.title}
            className={`slide${index === 0 ? " active" : ""}`}
          >
            {slide.source && (
              <img
                src={slide.source}
                alt={slide.title}
                loading="lazy"
                draggable={false}
              />
            )}
            {slide.title && <h3>{slide.title}</h3>}
          </div>
        ))}
      </div>
      <button
        className="nextArrow"
        onClick={() => navigationHandle("right")}
        disabled={slideNumber === slides.length - 1}
      >
        »
      </button>
      <div className="sliderPagination">
        {slideNumber + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Slider;
