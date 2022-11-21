import { Certificate } from "@/application/models/certificate";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
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
            src={certificate.certificate_url}
            alt={certificate.name}
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <div className="certificate-card__content">
        <div className="certificate-card__content__title">
          <span className="title">{certificate.name}</span>
        </div>
        <div className="certificate-card__content__buttons" onClick={() => {}}>
          <span className="download-button">
            <i className="material-icons-outlined">cloud_download</i>
            <a target="_parent" href={certificate.certificate_url}>
              Baixar certificado
            </a>
          </span>
          <div className="social-buttons">
            <span className="social-buttons__images">
              <EmailShareButton
                url={certificate.certificate_url}
                subject={certificate.name}
                body={certificate.certificate_url}
                className="share__button"
              >
                <EmailIcon size={32} round></EmailIcon>
              </EmailShareButton>
              <LinkedinShareButton
                url={certificate.certificate_url}
                title={certificate.name}
                summary={certificate.certificate_url}
                source="https://academiadeprofissionais.obramax.com.br"
                className="share__button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <FacebookShareButton
                url={certificate.certificate_url}
                quote={certificate.name}
                className="share__button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={certificate.certificate_url}
                title={certificate.name}
                className="share__button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
