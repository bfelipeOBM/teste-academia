import supMaterialImg from "@/assets/sup-material.png";
import "./SupportMaterial.scss";

const SupportMaterial = () => {
  return (
    <div className="support-material">
      <div className="support-material__content">
        <div className="support-material__content__img">
          <img src={supMaterialImg} alt="Material de apoio" />
        </div>
        <div className="support-material__content__info">
          <span className="title">Material de apoio</span>
          <span className="description">
            Além dos cursos e aulas, aqui você encontrará vídeos, manuais,
            apresentações e muito conteúdo para enriquecer ainda mais seu
            trabalho! Aproveite tudo que a Academia de Profissionais oferece
            especialmente para você, profissional da construção!
          </span>

          <div className="support-material__content__info__buttons">
            <button className="button">Baixar Material</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportMaterial;
