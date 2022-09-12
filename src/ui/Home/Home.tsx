import "../../App.css";
import DetailsBanner from "../Banners/DetailsBanner/DetailsBanner";
import CourseCategory from "../Courses/CourseCategory/CourseCategory";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="App">
      <Header></Header>
      <CourseCategory></CourseCategory>
      <DetailsBanner></DetailsBanner>
      <Footer></Footer>
    </div>
  );
};

export default Home;
