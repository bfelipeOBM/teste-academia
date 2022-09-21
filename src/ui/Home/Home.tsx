import "@/App.css";
import CarouselBanner from "@/ui/Banners/CarouselBanner/CarouselBanner";
import DetailsBanner from "@/ui/Banners/DetailsBanner/DetailsBanner";
import CourseCategory from "@/ui/Courses/CourseCategory/CourseCategory";
import FeaturedCourses from "@/ui/Courses/FeaturedCourses/FeaturedCourses";
import SupportMaterial from "@/ui/Courses/SupportMaterial/SupportMaterial";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";

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
