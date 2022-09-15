import "../../App.css";
import CarouselBanner from "../Banners/CarouselBanner/CarouselBanner";
import DetailsBanner from "../Banners/DetailsBanner/DetailsBanner";
import CourseCategory from "../Courses/CourseCategory/CourseCategory";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="App">
      <Header></Header>
      <CarouselBanner></CarouselBanner>
      <CourseCategory></CourseCategory>
      <DetailsBanner></DetailsBanner>
      <Footer></Footer>
    </div>
  );
};

export default Home;
