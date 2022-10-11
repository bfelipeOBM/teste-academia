import { FormatToBrazilianDate } from "@/application/common/Utils";
import { Course } from "@/application/models/course";
import "./SimpleCourseCard.scss";

interface Props {
  course: Course;
}

type courseStatus =
  | "PAST"
  | "UPCOMING"
  | "FINISHED"
  | "CANCELLED"
  | "IN PROGRESS";

const SimpleCourseCard = (props: Props) => {
  const { course } = props;

  const currentStatus = (status: courseStatus) => {
    if (!status) return "";

    switch (status) {
      case "IN PROGRESS":
        return "in-progress";
      case "CANCELLED":
        return "canceled";
      case "FINISHED":
        return "finished";
      case "UPCOMING":
        return "in-progress";
      case "PAST":
        return "canceled";
      default:
        return "";
    }
  };

  const status = (status: courseStatus) => {
    if (!status) return "";

    switch (status) {
      case "IN PROGRESS":
        return "Em andamento";
      case "CANCELLED":
        return "Cancelado";
      case "FINISHED":
        return "Concluído";
      case "UPCOMING":
        return course?.date && FormatToBrazilianDate(course.date);
      case "PAST":
        return "Encerrado";
      default:
        return "";
    }
  };

  return (
    <div className="simple-course-card">
      <div className="simple-course-card__header">
        <div className="simple-course-card__header__status">
          <span className={currentStatus(course.status as courseStatus)}>
            {status(course.status as courseStatus)}
          </span>
        </div>
        <div className="simple-course-card__header__image">
          <img
            src={course.course_image}
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
