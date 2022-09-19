import { useState } from "react";
import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";
import slider1 from "../../../assets/slider-1@2x.png";
import slider2 from "../../../assets/slider-2@2x.png";
import "./CarouselBanner.scss";

const CarouselBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [carouselItems, setCarouselItems] = useState([
    {
      src: slider1,
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      src: slider2,
      altText: "Slide 2",
      caption: "Slide 2",
    },
  ]);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = carouselItems.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img
          src={item.src}
          alt={item.altText}
          className="carousel-banner__image"
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      fade
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className="carousel-banner"
    >
      <CarouselIndicators
        className="carousel-banner__indicators"
        items={carouselItems}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
    </Carousel>
  );
};

export default CarouselBanner;
