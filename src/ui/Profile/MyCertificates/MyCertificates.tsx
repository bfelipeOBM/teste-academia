import CertificateCard from "@/ui/Certificate/CertificateCard/CertificateCard";
import React, { useState } from "react";
import "./MyCertificates.scss";

const MyCertificates = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState("expand_more");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationIcon, setLocationIcon] = useState("expand_more");
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [typesIcon, setTypesIcon] = useState("expand_more");

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

  const certificates = [
    {
      id: 1,
      title: "Curso de pintura",
      image: "https://picsum.photos/674/364/",
    },
    {
      id: 2,
      title: "CMil e uma utilidade da resina acrílica na obra",
      image: "https://picsum.photos/674/364/",
    },
    {
      id: 3,
      title: "Curso de acabamento",
      image: "https://picsum.photos/674/364/",
    },
  ];

  //TODO: get user data from api
  const userInfoMock = {
    name: "John Doe",
    description: "Mil e uma utilidade da resina acrílica na obra",
  };

  return (
    <>
      <div className="my-certificates">
        <div className="my-certificates__header">
          <span className="my-certificates__header__title">
            Meus Certificados
          </span>
          <span className="my-certificates__header__description">
            Olá {userInfoMock.name}, o curso{" "}
            <strong>{userInfoMock.description}</strong> inicia em breve
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

          <div className="my-certificates__content__divider"></div>

          <div className="my-certificates__content__certificates">
            <div className="cards">
              {certificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                ></CertificateCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCertificates;
