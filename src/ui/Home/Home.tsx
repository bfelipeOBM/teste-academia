import "../../App.css";
import CourseCategory from "../Courses/CourseCategory/CourseCategory";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="App">
      <Header></Header>
      <CourseCategory></CourseCategory>
      <Footer></Footer>
    </div>
  );
};

export default Home;
