import SimpleCourseCard from "@/ui/Courses/SimpleCourseCard/SimpleCourseCard";
import React, { useState } from "react";
import "./MyCourses.scss";

type currentTabT = "all" | "in-progress" | "finished" | "canceled";

const MyCourses = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");
  const [currentTab, setCurrentTab] = useState<currentTabT>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setCategoryIcon(!isCategoryOpen ? "expand_more" : "expand_less");
  };

  const handleTypesClick = () => {
    setIsTypesOpen(!isTypesOpen);
    setTypesIcon(!isTypesOpen ? "expand_more" : "expand_less");
  };

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen);
    setLocationIcon(!isLocationOpen ? "expand_more" : "expand_less");
  };

  const handleTabChange = (tab: currentTabT) => {
    setCurrentTab(tab);
  };

  const courses = [
    {
      id: 1,
      name: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Pintura"],
      nextClass: "13/10/2022",
      status: "Concluído",
    },
    {
      id: 2,
      name: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Participe e aprenda como utilizar de forma correta a resina acrílica e traga durabilidade para o seu projeto. Nossa live e aprenda como utilizar de forma correta a resina acrílica. Uma parceria da Academia de Profissionais e Drylevis",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Acabamento"],
      nextClass: "13/10/2022",
      status: "13/10/2022",
    },
    {
      id: 3,
      name: "Preparação de superfície - Pintura em parede interna",
      description:
        "Conheça na prática as melhores dicas para preparação de superfície e pintura de paredes internas. Uma parceria da Academia de Profissionais e Coral + Tigre.",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Pintura", "Acabamento"],
      nextClass: "13/10/2022",
      status: "Cancelado",
    },
    {
      id: 4,
      name: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Participe e aprenda como utilizar de forma correta a resina acrílica e traga durabilidade para o seu projeto. Nossa live e aprenda como utilizar de forma correta a resina acrílica. Uma parceria da Academia de Profissionais e Drylevis",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Acabamento"],
      nextClass: "13/10/2022",
      status: "13/10/2022",
    },
    {
      id: 5,
      name: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Pintura"],
      nextClass: "13/10/2022",
      status: "Concluído",
    },

    {
      id: 6,
      name: "Preparação de superfície - Pintura em parede interna",
      description:
        "Conheça na prática as melhores dicas para preparação de superfície e pintura de paredes internas. Uma parceria da Academia de Profissionais e Coral + Tigre.",
      image: "https://picsum.photos/674/364/",
      tags: ["Online", "Pintura", "Acabamento"],
      nextClass: "13/10/2022",
      status: "Cancelado",
    },
  ];

  //TODO: get user data from api
  const userInfoMock = {
    name: "John Doe",
    description: "Mil e uma utilidade da resina acrílica na obra",
  };

  return (
    <>
      <div className="my-courses">
        <div className="my-courses__header">
          <span className="my-courses__header__title">
            Cursos que estou inscrito
          </span>
          <span className="my-courses__header__description">
            Olá {userInfoMock.name}, o curso{" "}
            <strong>{userInfoMock.description}</strong> inicia em breve
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
              <i className="material-icons">circle</i> Cursos a conluir
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
              </div>

              <div className="item-category" onClick={handleTypesClick}>
                <span className="title">Tipos</span>
                <i className="material-icons ">{typesIcon}</i>
              </div>

              <div className="item-location" onClick={handleLocationClick}>
                <span className="title">Localização</span>
                <i className="material-icons ">{locationIcon}</i>
              </div>
            </div>
          </div>

          <div className="my-courses__content__divider"></div>

          <div className="my-courses__content__courses">
            <div className="cards">
              {courses.map((course) => (
                <SimpleCourseCard
                  key={course.id}
                  course={course}
                ></SimpleCourseCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
