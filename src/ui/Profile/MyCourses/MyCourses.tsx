import { Course } from "@/application/models/course";
import { ApplicationState } from "@/application/store";
import {
  clearCourses,
  getCoursesLocations,
  getMyCourses,
} from "@/application/store/courses/action";
import SimpleCourseCard from "@/ui/Courses/SimpleCourseCard/SimpleCourseCard";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MyCourses.scss";

type currentTabT = "all" | "in-progress" | "finished" | "canceled";

const CategoryListLeft = [
  { title: "Eletricista" },
  { title: "Pedreiro" },
  { title: "Mestre de Obras" },
  { title: "Encanador" },
  { title: "Jardineiro" },
  { title: "Empreiteiro" },
  { title: "Azulejista" },
  { title: "Hidráulico" },
];

const CategoryListRight = [
  { title: "Técnico em construção civil/edificações" },
  { title: "Arquiteto" },
  { title: "Assentador de pisos" },
  { title: "Marceneiro" },
  { title: "Pintor" },
  { title: "Engenheiro" },
];

const FilterCoursesTypes = [
  { title: "Todos" },
  { title: "Presencial" },
  { title: "Online" },
];

const MyCourses = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");
  const [currentTab, setCurrentTab] = useState<currentTabT>("all");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const dispatch = useDispatch();

  const { mycourses } = useSelector((state: ApplicationState) => state.courses);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const { courses_locations } = useSelector(
    (state: ApplicationState) => state.courses_locations
  );

  const handleFuseSearch = (value: string) => {
    const fuse = new Fuse(mycourses, {
      keys: ["name", "status", "category", "upcoming_classes.location"],
    });

    if (!value) {
      setFilteredCourses(mycourses);
      return;
    }

    const result = fuse.search(value);

    setFilteredCourses(result.map((item) => item.item));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectedFilter = (filter: string) => {
    setSearchValue(filter);
  };

  const handleSelectedType = (type: string) => {
    if (type === "Todos") {
      setSearchValue("");
      setShowLocationFilter(false);
    } else if (type === "Presencial") {
      setShowLocationFilter(true);
    } else if (type === "Online") {
      setSearchValue(type);
      setShowLocationFilter(false);
    }
  };

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setCategoryIcon(!isCategoryOpen ? "expand_less" : "expand_more");
  };

  const handleTypesClick = () => {
    setIsTypesOpen(!isTypesOpen);
    setTypesIcon(!isTypesOpen ? "expand_less" : "expand_more");
  };

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen);
    setLocationIcon(!isLocationOpen ? "expand_less" : "expand_more");
  };

  useEffect(() => {
    dispatch(getMyCourses(profile) as any);
    dispatch(getCoursesLocations() as any);

    return () => {
      dispatch(clearCourses() as any);
    };
  }, []);

  useEffect(() => {
    if (mycourses) handleFuseSearch(searchValue);
  }, [searchValue, mycourses]);

  return (
    <>
      <div className="my-courses">
        <div className="my-courses__header">
          <span className="my-courses__header__title">
            Cursos que estou inscrito
          </span>
          <span className="my-courses__header__description">
            Olá {profile.name}, aqui estão os cursos que você está inscrito.
          </span>
        </div>

        <div className="my-courses__tabs">
          <div
            className={`my-courses__tabs__tab ${
              currentTab === "all" ? "tab-active" : ""
            }`}
            onClick={() => setCurrentTab("all")}
          >
            <span className="my-courses__tabs__tab__all-courses">
              Todos os cursos
            </span>
          </div>
          <div
            className={`my-courses__tabs__tab ${
              currentTab === "in-progress" ? "tab-active" : ""
            }`}
            onClick={() => setCurrentTab("in-progress")}
          >
            <span className="my-courses__tabs__tab__in-progress">
              <i className="material-icons">circle</i> Cursos a concluir
            </span>
          </div>
          <div
            className={`my-courses__tabs__tab ${
              currentTab === "finished" ? "tab-active" : ""
            }`}
            onClick={() => setCurrentTab("finished")}
          >
            <span className="my-courses__tabs__tab__finished">
              <i className="material-icons">circle</i> Cursos concluídos
            </span>
          </div>
          <div
            className={`my-courses__tabs__tab ${
              currentTab === "canceled" ? "tab-active" : ""
            }`}
            onClick={() => setCurrentTab("canceled")}
          >
            <span className="my-courses__tabs__tab__canceled">
              <i className="material-icons">circle</i> Cursos cancelados
            </span>
          </div>
        </div>

        <div className="my-courses__content">
          <div className="search-bar__and__filters">
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
                <span>Filtre por:</span>
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
                        className="item-category__categories__dropdown-menu__menu__items__left__item"
                        onClick={() => {
                          handleSelectedFilter(category.title);
                          handleCategoryClick();
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
                        className="item-category__categories__dropdown-menu__menu__items__right__item"
                        onClick={() => handleSelectedFilter(category.title)}
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
                        className="item-type__courses-types__dropdown-menu__menu__items__left__item"
                        onClick={() => {
                          handleSelectedType(courseType.title);
                          handleTypesClick();
                        }}
                      >
                        <span>{courseType.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {showLocationFilter && (
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
                          className="item-location__locations__dropdown-menu__menu__items__left__item"
                          onClick={() => {
                            handleSelectedFilter(location.name);
                            handleLocationClick();
                          }}
                        >
                          <span>{location.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="my-courses__content__divider"></div>

          <div className="my-courses__content__courses">
            <div className="cards">
              {filteredCourses.map((course) => (
                <SimpleCourseCard
                  key={course.id}
                  course={course}
                ></SimpleCourseCard>
              ))}
              {filteredCourses.length < 1 && searchValue === "" && (
                <h1>Nenhum curso matriculado</h1>
              )}
              {filteredCourses.length < 1 && searchValue !== "" && (
                <h1>Nenhum curso encontrado</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
