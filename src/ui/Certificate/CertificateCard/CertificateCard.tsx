import { Certificate } from "@/application/models/certificate";
import "./CertificateCard.scss";

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = (props: CertificateCardProps) => {
  const { certificate } = props;

  return (
    <div className="certificate-card">
      <div className="certificate-card__header">
        <div className="certificate-card__header__image">
          <img
            src={certificate.image}
            alt={certificate.title}
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <div className="certificate-card__content">
        <div className="certificate-card__content__title">
          <span className="title">{certificate.title}</span>
        </div>
        <div className="certificate-card__content__buttons" onClick={() => {}}>
          <span className="download-button">
            <i className="material-icons-outlined">cloud_download</i>
            <span>Baixar certificado</span>
          </span>
          <div className="social-buttons">
            <span className="social-buttons__images">
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon_linkedin.png"
                alt="linkedin"
                width="100%"
                height="100%"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon_facebook.png"
                alt="facebook"
                width="100%"
                height="100%"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon-whatsapp.png"
                alt="twitter"
                width="100%"
                height="100%"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
