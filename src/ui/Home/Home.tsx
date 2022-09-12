import "../../App.css";
import CourseCategory from "../Courses/CourseCategory/CourseCategory";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className="App">
      <Header></Header>
      <CourseCategory></CourseCategory>
    </div>
  );
};

export default Home;
