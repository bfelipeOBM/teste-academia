import { Course } from "@/application/models/course";
import { ApplicationState } from "@/application/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CourseCard.scss";

interface Props {
  course: Course;
}

const CourseCard = (props: Props) => {
  const { course } = props;
  const [nextClassDate, setNextClassDate] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state: ApplicationState) => state.user);

  const goToCourse = () => {
    user.isLoggedIn ? navigate(`/course/${course.id}`) : navigate(`/login`);
  };

  useEffect(() => {
    if (course?.upcoming_classes && course.upcoming_classes.length > 0) {
      course.upcoming_classes[0].date
        ? setNextClassDate(
            new Intl.DateTimeFormat("pt-BR").format(
              new Date(course.upcoming_classes[0].date)
            )
          )
        : setNextClassDate("");
    }
  }, [course]);

  return (
    <div className="course-card">
      <div className="course-card__image">
        <img src={course.image} alt={course.name} width="100%" height="100%" />
      </div>
      <div className="course-card__content">
        <div className="course-card__content__header">
          <div className="header__tags">
            {course?.category!.map((tag) => (
              <div key={tag} className="tag">
                <span className="title">{tag}</span>
              </div>
            ))}
          </div>

          <div className="header__next-class">
            <span className="title">
              {course?.upcoming_classes && (
                <>
                  próxima turma: <span className="date">{nextClassDate}</span>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="course-card__content__title__description">
          <span className="title">{course.name}</span>
          <span className="description">{course.description}</span>
        </div>
        <div className="course-card__content__footer">
          <button className="goto__button" onClick={goToCourse}>
            Quero Participar
          </button>
          {course?.workload && (
            <div className="workload">
              Carga horária: <span>{course?.workload}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
