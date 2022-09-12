import { ChangeEvent, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./CourseCategory.scss";

const CourseCategory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setCategoryIcon(!isCategoryOpen ? "expand_more" : "expand_less");
  };

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen);
    setLocationIcon(!isLocationOpen ? "expand_more" : "expand_less");
  };

  const courses = [
    {
      id: 1,
      title: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
      image: "https://picsum.photos/674/364?random=1",
      tags: ["Online", "Pintura"],
      nextClass: "13/10/2022",
    },
    {
      id: 2,
      title: "Mofo e bolor na parede como resolver antes da pintura",
      description:
        "Participe e aprenda como utilizar de forma correta a resina acrílica e traga durabilidade para o seu projeto. Nossa live e aprenda como utilizar de forma correta a resina acrílica. Uma parceria da Academia de Profissionais e Drylevis",
      image: "https://picsum.photos/674/364?random=2",
      tags: ["Online", "Acabamento"],
      nextClass: "13/10/2022",
    },
    {
      id: 3,
      title: "Preparação de superfície - Pintura em parede interna",
      description:
        "Conheça na prática as melhores dicas para preparação de superfície e pintura de paredes internas. Uma parceria da Academia de Profissionais e Coral + Tigre.",
      image: "https://picsum.photos/674/364?random=3",
      tags: ["Online", "Pintura", "Acabamento"],
      nextClass: "13/10/2022",
    },
  ];

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
              </div>

              <div className="item-location" onClick={handleLocationClick}>
                <span className="title">Localização</span>
                <i className="material-icons ">{locationIcon}</i>
              </div>
            </div>
          </div>

          <div className="content__divider"></div>

          <div className="content__courses">
            <div className="cards">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCategory;
