import Constants from "@/application/common/Constants";
import { navigateToExternalUrl } from "@/application/common/Utils";
import "./DetailsBanner.scss";

const DetailsBanner = () => {
  return (
    <div
      className="details-banner"
      onClick={() => navigateToExternalUrl(Constants.YOUTUBE_URL)}
    >
      <div className="details-banner__content">
        <img
          width="100%"
          height="100%"
          src="https://www.obramax.com.br/media/wysiwyg/banner-canal-e-academia-2_2_-min.jpg"
        />
      </div>
    </div>
  );
};

export default DetailsBanner;
