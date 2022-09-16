import "../../App.css";
import CarouselBanner from "../Banners/CarouselBanner/CarouselBanner";
import DetailsBanner from "../Banners/DetailsBanner/DetailsBanner";
import CourseCategory from "../Courses/CourseCategory/CourseCategory";
import FeaturedCourses from "../Courses/FeaturedCourses/FeaturedCourses";
import SupportMaterial from "../Courses/SupportMaterial/SupportMaterial";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="App">
      <Header></Header>
      <CarouselBanner></CarouselBanner>
      <FeaturedCourses></FeaturedCourses>
      <SupportMaterial></SupportMaterial>
      <CourseCategory></CourseCategory>
      <DetailsBanner></DetailsBanner>
      <Footer></Footer>
    </div>
  );
};

export default Home;
