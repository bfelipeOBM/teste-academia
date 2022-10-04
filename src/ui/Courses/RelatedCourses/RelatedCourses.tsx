import { ApplicationState } from "@/application/store";
import {
  clearCourses,
  getAllCourses,
} from "@/application/store/courses/action";
import CourseCard from "@/ui/Courses/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";
import "./RelatedCourses.scss";

const RelatedCourses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { courses } = useSelector((state: ApplicationState) => state.courses);

  const dispatch = useDispatch();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === courses.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? courses.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = courses?.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <CourseCard course={item} />
      </CarouselItem>
    );
  });

  useEffect(() => {
    dispatch(getAllCourses() as any);

    return () => {
      dispatch(clearCourses() as any);
    };
  }, []);

  return (
    <div className="related-courses">
      <div className="related-courses__title">
        <h1>Cursos Relacionados</h1>
      </div>

      <div className="related-courses__content">
        <Carousel
          fade
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators
            items={courses || []}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides || []}
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedCourses;
