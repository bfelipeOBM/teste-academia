import { Course } from "@/application/models/course";
import { ApplicationState } from "@/application/store";
import { clearCourses, getCourses } from "@/application/store/courses/action";
import CourseCard from "@/ui/Courses/CourseCard/CourseCard";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CourseCategory.scss";

const CourseCategory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");

  const { courses } = useSelector((state: ApplicationState) => state.courses);

  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    dispatch(getCourses() as any);

    return () => {
      dispatch(clearCourses() as any);
    };
  }, []);

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

              <div className="item-type" onClick={handleTypesClick}>
                <span className="title">Tipos</span>
                <i className="material-icons ">{typesIcon}</i>
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
              {courses?.map((course: Course) => (
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
