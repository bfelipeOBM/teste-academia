import MyCertificates from "@/ui/Certificate/MyCertificates/MyCertificates";
import MyCourses from "@/ui/Courses/MyCourses/MyCourses";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import { useState } from "react";
import "./Profile.scss";
import ProfileCard from "./ProfileCard/ProfileCard";
import ProfileEdit from "./ProfileEdit/ProfileEdit";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [currentPage, setCurrentPage] = useState<
    "profile" | "courses" | "certificates"
  >("profile");

  const handlePageChange = (page: "profile" | "courses" | "certificates") => {
    setCurrentPage(page);
  };

  const ProfileCardProps = {
    name,
    email,
    image: "https://i.pravatar.cc/300",
    onEdit: () => {
      setCurrentPage("profile");
    },
    currentPage,
    handlePageChange,
  };

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

            {currentPage === "profile" && <ProfileEdit></ProfileEdit>}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
