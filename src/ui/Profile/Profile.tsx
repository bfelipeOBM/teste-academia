import { ApplicationState } from "@/application/store";
import defaultProfileImage from "@/assets/default_profile_image@2x.png";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import MyCertificates from "@/ui/Profile/MyCertificates/MyCertificates";
import MyCourses from "@/ui/Profile/MyCourses/MyCourses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import ProfileCard from "./ProfileCard/ProfileCard";
import ProfileEdit from "./ProfileEdit/ProfileEdit";

type ProfileCardPropsT = {
  name: string;
  email: string;
  profile_image: string;
  onEdit: () => void;
  currentPage: string;
  handlePageChange: (page: "profile" | "courses" | "certificates") => void;
};

const Profile = () => {
  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const { profilePage } = useSelector(
    (state: ApplicationState) => state.profile
  );
  const { name, email, profile_image } = profile;

  const [currentPage, setCurrentPage] = useState<string>(profilePage);
  const [ProfileCardProps, setProfileCardProps] = useState<ProfileCardPropsT>({
    name: "",
    email: "",
    profile_image: "",
    onEdit: () => {},
    currentPage: profilePage,
    handlePageChange: () => {},
  });

  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/");
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    setProfileCardProps({
      name,
      email,
      profile_image: profile_image || defaultProfileImage,
      onEdit: () => {
        setCurrentPage("profile");
      },
      currentPage,
      handlePageChange,
    });
  }, [profile, currentPage]);

  useEffect(() => {
    handlePageChange(profilePage);
  }, [profilePage]);

  return (
    <>
      <Header></Header>
      <div className="profile">
        <div className="profile__header">
          <span className="profile__header-title">minha conta</span>
          <span className="profile__header-description">
            {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy */}
          </span>
        </div>
        <div className="profile__content">
          <div className="profile__content-left">
            <ProfileCard {...ProfileCardProps}></ProfileCard>
          </div>
          <div className="profile__content-right">
            {currentPage === "certificates" && (
              <MyCertificates></MyCertificates>
            )}

            {currentPage === "courses" && <MyCourses></MyCourses>}

            {currentPage === "profile" && (
              <ProfileEdit userInfo={profile}></ProfileEdit>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
