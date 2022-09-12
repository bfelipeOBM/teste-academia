import { Link, useNavigate } from "react-router-dom";
import "./CourseCard.scss";

interface Props {
  course: Course;
}

type Course = {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  nextClass: string;
};

const CourseCard = (props: Props) => {
  const { course } = props;
  const navigate = useNavigate();

  const goToCourse = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course-card">
      <div className="course-card__image">
        <img
          src={course.image}
          alt={course.title}
          width="674px"
          height="100%"
        />
      </div>
      <div className="course-card__content">
        <div className="course-card__content__header">
          <div className="header__tags">
            {course.tags.map((tag) => (
              <div key={tag} className="tag">
                <span className="title">{tag}</span>
              </div>
            ))}
          </div>

          <div className="header__next-class">
            <span className="title">
              próxima turma: <span className="date">{course.nextClass}</span>
            </span>
          </div>
        </div>
        <div className="course-card__content__title__description">
          <span className="title">{course.title}</span>
          <span className="description">{course.description}</span>
        </div>
        <div className="course-card__content__footer">
          <button className="goto__button" onClick={goToCourse}>
            Quero Participar
          </button>

          <Link className="learn-more" to={`/courses/${course.id}`}>
            <span>mais informações</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
