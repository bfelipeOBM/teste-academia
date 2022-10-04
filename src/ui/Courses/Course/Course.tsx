import { ApplicationState } from "@/application/store";
import { getCourse } from "@/application/store/courses/action";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedCourses from "../RelatedCourses/RelatedCourses";
import "./Course.scss";

const Course = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector((state: ApplicationState) => state.course);
  const [loading, setLoading] = useState(false);

  window.scrollTo(0, 0);

  const loadCourse = async () => {
    setLoading(true);
    if (id) {
      await dispatch(getCourse(parseInt(id)) as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, []);

  return (
    <>
      <Header></Header>
      {!loading && course && (
        <div className="course">
          <div className="course__header">
            <div className="course__header__title">
              CURSO <span> {course.name}</span>
            </div>
          </div>
          <div className="course__content">
            <div className="course__info">
              <div className="course__info__video">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="course__info__content">
                <div className="tags">
                  {course.category?.map((tag: string) => (
                    <div key={tag} className="tag">
                      <span className="title">{tag}</span>
                    </div>
                  ))}
                </div>
                <div className="title">{course.name}</div>
                <div className="description">
                  <p>{course.description}</p>
                </div>
                <div className="share">
                  <span className="share__title">Compartilhar: </span>
                  <span className="share__images">
                    <img
                      src="https://www.obramax.com.br/media/wysiwyg/icon_linkedin.png"
                      alt="linkedin"
                      width="100%"
                      height="100%"
                    />
                    <img
                      src="https://www.obramax.com.br/media/wysiwyg/icon_facebook.png"
                      alt="facebook"
                      width="100%"
                      height="100%"
                    />
                    <img
                      src="https://www.obramax.com.br/media/wysiwyg/icon-whatsapp.png"
                      alt="twitter"
                      width="100%"
                      height="100%"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="course__details">
              <div className="course__details__content">
                <div className="title">
                  <span>DETALHES DO CURSO</span>
                </div>
                <div className="details">
                  <div className="date">
                    {/* Data: <span>{course.upcoming_classes[0]}</span> */}
                    Data: <span>22/10/2022</span>
                  </div>

                  <div className="workload">
                    {/* Carga horária: <span>{course.workload}</span> */}
                    Carga horária: <span>8 horas</span>
                  </div>

                  <div className="categories">
                    Categorias:{" "}
                    <span>
                      {course?.category &&
                        course.category.map((tag, index, arr) =>
                          arr.length - 1 === index ? (
                            <span key={index}>{tag}</span>
                          ) : (
                            <span key={index}>{`${tag}, `}</span>
                          )
                        )}
                    </span>
                  </div>

                  <div className="enrollments">
                    {/* <span>{course.enrollments}</span> pessoas já se inscreveram nesse curso */}
                    <span>100</span> pessoas já se inscreveram nesse curso
                  </div>
                </div>

                <div className="download">
                  <button>
                    <i className="material-icons-outlined">cloud_download</i>{" "}
                    Baixar material de apoio
                  </button>
                </div>
              </div>

              <div className="course__details__subscribe">
                <button>Inscrever-se</button>
              </div>

              <div className="course__details__next-dates">
                <span className="title">Próximas datas</span>
                {/* {course?.upcoming_classes!.map((item: any) => (
                <div key={item.date} className="date">
                  <span className="title">{item.date}</span>
                  <div className="divider"></div>
                  <span className="location">{item.location}</span>
                </div>
              ))} */}
              </div>
            </div>
          </div>

          <div className="course__footer">
            <RelatedCourses></RelatedCourses>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};

export default Course;
