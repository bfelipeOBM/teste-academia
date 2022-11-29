import { isMobile, navigateToExternalUrl } from "@/application/common/Utils";
import { Banner } from "@/application/models/banner";
import { ApplicationState } from "@/application/store";
import {
  getBanners,
  getMobileBanners,
} from "@/application/store/banners/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";
import "./CarouselBanner.scss";

const CarouselBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [carouselItems, setCarouselItems] = useState<Banner[]>([]);

  const dispatch = useDispatch();

  const { banners } = useSelector((state: ApplicationState) => state.banners);
  const { mobilebanners } = useSelector(
    (state: ApplicationState) => state.mobilebanners
  );

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

  const openExternalUrl = (url: string) => {
    if (url) {
      navigateToExternalUrl(url, false);
    }
  };

  const slides = carouselItems.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img
          src={item.url}
          onClick={() => openExternalUrl(item.link)}
          className="carousel-banner__image"
        />
      </CarouselItem>
    );
  });

  useEffect(() => {
    if (!isMobile()) {
      if (banners.length) {
        setCarouselItems(banners);
      }
    } else {
      if (mobilebanners.length) {
        setCarouselItems(mobilebanners);
      }
    }
  }, [banners, mobilebanners, isMobile()]);

  useEffect(() => {
    dispatch(getBanners() as any);
    dispatch(getMobileBanners() as any);
  }, []);

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
