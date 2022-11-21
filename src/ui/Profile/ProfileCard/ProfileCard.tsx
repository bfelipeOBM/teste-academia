import "./ProfileCard.scss";

interface ProfileCardProps {
  name: string;
  email: string;
  profile_image: string;
  onEdit: () => void;
  currentPage: "profile" | "courses" | "certificates";
  handlePageChange: (page: "profile" | "courses" | "certificates") => void;
}

const ProfileCard = (props: ProfileCardProps) => {
  const { name, email, profile_image, onEdit, currentPage, handlePageChange } =
    props;

  return (
    <div className="profile-card">
      <div className="profile-card__user-info">
        <div className="profile-card__user-info__header" onClick={onEdit}>
          <span
            className="profile-card__user-info__header-edit-button"
            onClick={onEdit}
          >
            editar
          </span>
        </div>
        <div className="profile-card__user-info__avatar">
          <img src={profile_image} alt="profile" />
        </div>
        <div className="profile-card__user-info__info">
          <span className="user-name">{name}</span>
          <span className="user-email">{email}</span>
        </div>
      </div>

      <div className="profile-card__buttons">
        <button
          className={`profile-card__buttons__button ${
            currentPage === "certificates" ? "current-page" : ""
          }`}
          onClick={() => handlePageChange("certificates")}
        >
          Meus Certificados
        </button>
        <button
          className={`profile-card__buttons__button ${
            currentPage === "courses" ? "current-page" : ""
          }`}
          onClick={() => handlePageChange("courses")}
        >
          Meus Cursos
        </button>
        <button
          className={`profile-card__buttons__button ${
            currentPage === "profile" ? "current-page" : ""
          }`}
          onClick={() => handlePageChange("profile")}
        >
          Editar Meus Dados
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
