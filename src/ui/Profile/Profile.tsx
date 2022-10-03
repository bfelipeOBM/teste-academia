import { ApplicationState } from "@/application/store";
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
  image: string;
  onEdit: () => void;
  currentPage: "profile" | "courses" | "certificates";
  handlePageChange: (page: "profile" | "courses" | "certificates") => void;
};

const Profile = () => {
  const [currentPage, setCurrentPage] = useState<
    "profile" | "courses" | "certificates"
  >("profile");
  const [ProfileCardProps, setProfileCardProps] = useState<ProfileCardPropsT>({
    name: "",
    email: "",
    image: "",
    onEdit: () => {},
    currentPage: "profile",
    handlePageChange: () => {},
  });

  const navigate = useNavigate();

  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const { name, email, image } = profile;

  const handlePageChange = (page: "profile" | "courses" | "certificates") => {
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
      image: image || "https://i.pravatar.cc/300",
      onEdit: () => {
        setCurrentPage("profile");
      },
      currentPage,
      handlePageChange,
    });
  }, [profile, currentPage]);

  return (
    <>
      <Header></Header>
      <div className="profile">
        <div className="profile__header">
          <span className="profile__header-title">minha conta</span>
          <span className="profile__header-description">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
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