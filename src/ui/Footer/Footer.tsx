import footerLogo from "@/assets/logo.png";
import obramaxLogo from "@/assets/obramax_logo@2x.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__items">
        <div className="footer__items__up">
          <div className="footer__items__up__logo">
            <img
              src={footerLogo}
              width="100%"
              height="100%"
              alt="footer logo"
            />

            <img
              src={obramaxLogo}
              width="100%"
              height="100%"
              alt="footer logo"
            />
          </div>
        </div>

        <div className="footer__items__up__about">
          <span className="footer__items__up__about__text">
            A Academia de Profissionais oferece diversos cursos e aulas para
            capacitar você, profissional da construção! Em parceria com grandes
            nomes da indústria promovemos a troca de conhecimento e ensinamos
            boas práticas, dicas e tudo que você precisa saber para se manter
            sempre atualizado!
          </span>
        </div>

        {/* <div className="footer__items__divider__middle"></div>

        <div className="footer__items__middle">
          <div className="footer__items__middle__reputation-certified">
            <span className="footer__items__middle__reputation-certified__title">
              Reputação e certificação
            </span>

            <span className="footer__items__middle__reputation-certified__images">
              <img
                src="https://www.obramax.com.br/media/wysiwyg/selo_ra_1000.png"
                alt="reclame aqui"
                width="100%"
                height="100%"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/SELO_EBIT_BOA_BRONZE.png"
                alt="ebit"
                width="100%"
                height="100%"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/selos-google-43.png"
                alt="google rating"
                width="100%"
                height="100%"
              />
            </span>
          </div>

          <div className="footer__items__middle__social-media">
            <span className="footer__items__middle__social-media__title">
              Redes Sociais
            </span>

            <span className="footer__items__middle__social-media__images">
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon_facebook.png"
                alt="facebook"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon-youtube.png"
                alt="youtube"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon_linkedin.png"
                alt="linkedin"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon-instagram.png"
                alt="instagram"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon-twitter.png"
                alt="twitter"
              />
              <img
                src="https://www.obramax.com.br/media/wysiwyg/icon-tiktok.png"
                alt="tiktok"
              />
            </span>
          </div>
        </div> */}

        <div className="footer__items__divider__down"></div>

        <div className="footer__items__down">
          <div className="footer__items__down__copyright">
            <span className="footer__items__down__copyright__text">
              Elaborado e desenvolvido pela MLab / Obramax
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
