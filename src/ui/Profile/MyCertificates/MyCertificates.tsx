import { Certificate } from "@/application/models/certificate";
import { ApplicationState } from "@/application/store";
import {
  clearCertificates,
  getCertificates,
} from "@/application/store/certificates/action";
import { getCoursesLocations } from "@/application/store/courses/action";
import CertificateCard from "@/ui/Certificate/CertificateCard/CertificateCard";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MyCertificates.scss";

const CategoryListLeft = [
  { title: "Pedreiro" },
  { title: "Eletricista" },
  { title: "Mestre de Obras" },
  { title: "Encanador" },
  { title: "Serralheiro" },
  { title: "Gesseiro" },
];

const CategoryListRight = [
  { title: "Aplicador de drywall" },
  { title: "Marido de aluguel" },
  { title: "Marceneiro" },
  { title: "Pintor" },
];

const FilterCertificatesTypes = [
  { title: "Todos" },
  { title: "Presencial" },
  { title: "Online" },
];

const MyCertificates = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");
  const [filteredCertificates, setFilteredCertificates] = useState<
    Certificate[]
  >([]);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState("");
  const [selectedLocationItem, setSelectedLocationItem] = useState("");
  const [selectedTypesItem, setSelectedTypesItem] = useState("");

  const dispatch = useDispatch();

  const { certificates } = useSelector(
    (state: ApplicationState) => state.certificates
  );
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const { courses_locations } = useSelector(
    (state: ApplicationState) => state.courses_locations
  );

  const handleFuseSearch = (value: string) => {
    const fuse = new Fuse(certificates, {
      includeMatches: true,
      includeScore: true,
      location: 0,
      threshold: 0.4,
      keys: ["name", "category", "location", "date"],
    });

    if (!value) {
      setFilteredCertificates(certificates);
      return;
    }

    const result = fuse.search(value);

    setFilteredCertificates(result.map((item) => item.item));
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
    } else {
      setSearchValue(type);
    }
  };

  const handleSelectedCategory = (category: string) => {
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
    if (profile.id) {
      dispatch(getCertificates(profile.id) as any);
    }
    dispatch(getCoursesLocations() as any);

    return () => {
      dispatch(clearCertificates() as any);
    };
  }, []);

  useEffect(() => {
    if (certificates) handleFuseSearch(searchValue);
  }, [searchValue, certificates]);

  return (
    <>
      <div className="my-certificates">
        <div className="my-certificates__header">
          <span className="my-certificates__header__title">
            Meus Certificados
          </span>
          <span className="my-certificates__header__description">
            Olá {profile.name}, aqui estão os seus certificados.
          </span>
        </div>

        <div className="my-certificates__content">
          <div className="search-bar__and__filters">
            <div className="search">
              <form className="search__form">
                <i className="material-icons">search</i>
                <input
                  type="search"
                  className="search__form__input"
                  placeholder="Pesquisar Certificados"
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
                    {FilterCertificatesTypes.map((certificatesType, index) => (
                      <div
                        key={index}
                        className={`item-type__courses-types__dropdown-menu__menu__items__left__item ${
                          selectedTypesItem === certificatesType.title
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          handleSelectedType(certificatesType.title);
                          handleTypesClick();
                          handleSelectedTypes(certificatesType.title);
                        }}
                      >
                        <span>{certificatesType.title}</span>
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

          <div className="my-certificates__content__divider"></div>

          <div className="my-certificates__content__certificates">
            <div className="cards">
              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                ></CertificateCard>
              ))}
              {filteredCertificates.length < 1 && searchValue === "" && (
                <h1>Nenhum certificado</h1>
              )}
              {filteredCertificates.length < 1 && searchValue !== "" && (
                <h1>Nenhum certificado encontrado</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCertificates;
