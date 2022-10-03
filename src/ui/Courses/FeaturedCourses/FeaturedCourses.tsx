import CourseCard from "@/ui/Courses/CourseCard/CourseCard";
import { useState } from "react";
import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";
import "./FeaturedCourses.scss";

const courses = [
  {
    id: 1,
    title: "Mofo e bolor na parede como resolver antes da pintura",
    description:
      "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
    image: "https://picsum.photos/674/364/",
    tags: ["Online", "Pintura"],
    nextClass: "13/10/2022",
  },
  {
    id: 2,
    title: "Mofo e bolor na parede como resolver antes da pintura",
    description:
      "Participe e aprenda como utilizar de forma correta a resina acrílica e traga durabilidade para o seu projeto. Nossa live e aprenda como utilizar de forma correta a resina acrílica. Uma parceria da Academia de Profissionais e Drylevis",
    image: "https://picsum.photos/674/364/",
    tags: ["Online", "Acabamento"],
    nextClass: "13/10/2022",
  },
  {
    id: 3,
    title: "Preparação de superfície - Pintura em parede interna",
    description:
      "Conheça na prática as melhores dicas para preparação de superfície e pintura de paredes internas. Uma parceria da Academia de Profissionais e Coral + Tigre.",
    image: "https://picsum.photos/674/364/",
    tags: ["Online", "Pintura", "Acabamento"],
    nextClass: "13/10/2022",
  },
];

const FeaturedCourses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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

  const slides = courses.map((item, index) => {
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

  return (
    <div className="featured-courses">
      <div className="featured-courses__title">
        <h1>Cursos em destaque</h1>
      </div>

      <div className="featured-courses__content">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={courses}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedCourses;
