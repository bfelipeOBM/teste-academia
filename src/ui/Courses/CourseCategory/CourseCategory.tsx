import { Course } from "@/application/models/course";
import { ApplicationState } from "@/application/store";
import {
  clearCourses,
  getAllCourses,
  getCoursesLocations,
} from "@/application/store/courses/action";
import CourseCard from "@/ui/Courses/CourseCard/CourseCard";
import Fuse from "fuse.js";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CourseCategory.scss";

const CategoryListLeft = [
  { title: "Todos" },
  { title: "Pedreiro" },
  { title: "Eletricista" },
  { title: "Mestre de Obras" },
  { title: "Encanador" },
  { title: "Serralheiro" },
];

const CategoryListRight = [
  { title: "Gesseiro" },
  { title: "Aplicador de drywall" },
  { title: "Marido de aluguel" },
  { title: "Marceneiro" },
  { title: "Pintor" },
];

const FilterCoursesTypes = [
  { title: "Todos" },
  { title: "Presencial" },
  { title: "Online" },
];

const CourseCategory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState("");
  const [selectedLocationItem, setSelectedLocationItem] = useState("");
  const [selectedTypesItem, setSelectedTypesItem] = useState("");

  const { courses } = useSelector((state: ApplicationState) => state.courses);
  const { courses_locations } = useSelector(
    (state: ApplicationState) => state.courses_locations
  );

  const dispatch = useDispatch();

  const handleFuseSearch = (value: string) => {
    const fuse = new Fuse(courses, {
      includeMatches: true,
      includeScore: true,
      location: 0,
      threshold: 0.4,
      keys: ["name", "description", "category", "upcoming_classes.location"],
    });

    if (!value) {
      setFilteredCourses(courses);
      return;
    }

    if (value === "Presencial") {
      const result = fuse.search("online");
      const filtered = courses.filter(
        (course) => !result.map((item) => item.item.id).includes(course.id)
      );
      const presencialCourses = filtered.filter(
        (item) => item.upcoming_classes !== null
      );
      setFilteredCourses(presencialCourses);
      return;
    }

    const result = fuse.search(value);

    setFilteredCourses(result.map((item) => item.item));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectedFilter = (filter: string) => {
    setSearchValue(filter);
  };

  const handleSelectedType = (type: string) => {
    if (type === "Todos") {
      setSearchValue("");
    } else {
      setSearchValue(type);
    }
  };

  const handleSelectedCategory = (category: string) => {
    if (category === "Todos") setSearchValue("");
    setSelectedCategoryItem(category);
  };

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setCategoryIcon(!isCategoryOpen ? "expand_less" : "expand_more");
  };

  const handleSelectedTypes = (type: string) => {
    setSelectedTypesItem(type);
  };

  const handleTypesClick = () => {
    setIsTypesOpen(!isTypesOpen);
    setTypesIcon(!isTypesOpen ? "expand_less" : "expand_more");
  };

  const handleSelectedLocation = (location: string) => {
    setSelectedLocationItem(location);
  };

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen);
    setLocationIcon(!isLocationOpen ? "expand_less" : "expand_more");
  };

  useEffect(() => {
    dispatch(getAllCourses() as any);
    dispatch(getCoursesLocations() as any);

    return () => {
      dispatch(clearCourses() as any);
    };
  }, []);

  useEffect(() => {
    if (courses) handleFuseSearch(searchValue);
  }, [searchValue, courses]);

  return (
    <>
      <div className="course-category">
        <div className="course-category__content">
          <div className="content__title">
            <h1>CURSOS E CAPACITAÇÕES</h1>
          </div>
          <div className="content__description">
            <p>
              A Academia de Profissionais oferece diversos cursos e aulas para
              capacitar você, profissional da construção! Em parceria com
              grandes nomes da indústria promovemos a troca de conhecimento e
              ensinamos boas práticas, dicas e tudo que você precisa saber para
              se manter sempre atualizado!
            </p>
          </div>

          <div className="content__search-bar__and__filters">
            <div className="search">
              <form className="search__form">
                <i className="material-icons">search</i>
                <input
                  type="search"
                  className="search__form__input"
                  placeholder="Pesquisar Cursos"
                  spellCheck={false}
                  value={searchValue}
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div className="filters">
              <div className="filter__title">
                <span>Filtre cursos por:</span>
              </div>

              <div className="item-category" onClick={handleCategoryClick}>
                <span className="title">Categorias</span>
                <i className="material-icons ">{categoryIcon}</i>
                <div
                  className={`item-category__categories__dropdown-menu__menu ${
                    isCategoryOpen ? "active" : ""
                  }`}
                >
                  <div className="item-category__categories__dropdown-menu__menu__items__left">
                    {CategoryListLeft.map((category, index) => (
                      <div
                        key={index}
                        className={`item-category__categories__dropdown-menu__menu__items__left__item ${
                          selectedCategoryItem === category.title
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          handleSelectedFilter(category.title);
                          handleCategoryClick();
                          handleSelectedCategory(category.title);
                        }}
                      >
                        <span>{category.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="item-category__categories__dropdown-menu__menu__items__right">
                    {CategoryListRight.map((category, index) => (
                      <div
                        key={index}
                        className={`item-category__categories__dropdown-menu__menu__items__right__item ${
                          selectedCategoryItem === category.title
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          handleSelectedFilter(category.title);
                          handleCategoryClick();
                          handleSelectedCategory(category.title);
                        }}
                      >
                        <span>{category.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="item-type" onClick={handleTypesClick}>
                <span className="title">Tipos</span>
                <i className="material-icons ">{typesIcon}</i>

                <div
                  className={`item-type__courses-types__dropdown-menu__menu ${
                    isTypesOpen ? "active" : ""
                  }`}
                >
                  <div className="item-type__courses-types__dropdown-menu__menu__items__left">
                    {FilterCoursesTypes.map((courseType, index) => (
                      <div
                        key={index}
                        className={`item-type__courses-types__dropdown-menu__menu__items__left__item ${
                          selectedTypesItem === courseType.title ? "active" : ""
                        }`}
                        onClick={() => {
                          handleSelectedType(courseType.title);
                          handleTypesClick();
                          handleSelectedTypes(courseType.title);
                        }}
                      >
                        <span>{courseType.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="item-location" onClick={handleLocationClick}>
                <span className="title">Localização</span>
                <i className="material-icons ">{locationIcon}</i>

                <div
                  className={`item-location__locations__dropdown-menu__menu ${
                    isLocationOpen ? "active" : ""
                  }`}
                >
                  <div className="item-location__locations__dropdown-menu__menu__items__left">
                    {courses_locations.map((location, index) => (
                      <div
                        key={index}
                        className={`item-location__locations__dropdown-menu__menu__items__left__item ${
                          selectedLocationItem === location.name ? "active" : ""
                        }`}
                        onClick={() => {
                          handleSelectedFilter(location.name);
                          handleLocationClick();
                          handleSelectedLocation(location.name);
                        }}
                      >
                        <span>{location.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content__divider"></div>

          <div className="content__courses">
            <div className="cards">
              {filteredCourses?.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {filteredCourses.length < 1 && <h1>Nenhum curso encontrado</h1>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCategory;
