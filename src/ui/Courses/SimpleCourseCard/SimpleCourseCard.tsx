import { Course } from "@/application/models/course";
import "./SimpleCourseCard.scss";

interface Props {
  course: Course;
}

type courseStatus = "13/10/2022" | "Cancelado" | "Concluído";

const SimpleCourseCard = (props: Props) => {
  const { course } = props;

  const currentStatus = (status: courseStatus) => {
    if (!status) return "";

    switch (status) {
      case "13/10/2022":
        return "in-progress";
      case "Cancelado":
        return "canceled";
      case "Concluído":
        return "finished";
      default:
        return "";
    }
  };

  return (
    <div className="simple-course-card">
      <div className="simple-course-card__header">
        <div className="simple-course-card__header__status">
          <span className={currentStatus(course.status as courseStatus)}>
            {course.status}
          </span>
        </div>
        <div className="simple-course-card__header__image">
          <img
            src={course.image}
            alt={course.name}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className="simple-course-card__content">
        <div className="simple-course-card__content__title">
          <span className="title">{course.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleCourseCard;
