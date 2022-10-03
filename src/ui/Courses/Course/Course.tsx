import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedCourses from "../RelatedCourses/RelatedCourses";
import "./Course.scss";

const Course = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //   const course = useSelector((state: any) => state.course);
  const [loading, setLoading] = useState(false);

  window.scrollTo(0, 0);

  const course = {
    id: 1,
    title: "Mofo e bolor na parede como resolver antes da pintura",
    description:
      "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
    image: "https://picsum.photos/674/364/",
    tags: ["Online", "Pintura"],
    next_dates: [
      {
        date: "13/10/2021",
        location: "Online",
      },
      {
        date: "15/10/2021",
        location: "Obramax unidade Mocca",
      },
      {
        date: "20/10/2021",
        location: "Obramax unidade Praia Grande",
      },
    ],
    video_url: "https://www.youtube.com/embed/7sDY4m8KNLc",
    related_courses: [
      {
        id: 1,
        title: "Mofo e bolor na parede como resolver antes da pintura",
        description:
          "Aprenda como eliminar o mofo e bolor da parede e conheça as soluções de tintas que auxiliam na impermeabilização de paredes, muros e telhados. Uma parceria da Academia de Profissionais e Bautech.",
        image: "https://picsum.photos/674/364/",
        tags: ["Online", "Pintura"],
        next_dates: ["13/10/2022", "21/10/2022", "23/10/2022"],
        video_url: "https://www.youtube.com/embed/7sDY4m8KNLc",
      },
    ],
  };

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      //   await dispatch(getCourse(id) as any);
      setLoading(false);
    };

    loadCourse();
  }, [dispatch, id]);

  return (
    <>
      <Header></Header>
      <div className="course">
        <div className="course__header">
          <div className="course__header__title">
            CURSO <span> {course.title}</span>
          </div>
        </div>
        <div className="course__content">
          <div className="course__info">
            <div className="course__info__video">
              <iframe
                width="100%"
                height="100%"
                src={course.video_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="course__info__content">
              <div className="tags">
                {course.tags?.map((tag: string) => (
                  <div key={tag} className="tag">
                    <span className="title">{tag}</span>
                  </div>
                ))}
              </div>
              <div className="title">{course.title}</div>
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
                  Data: <span>13/10/2022</span>
                </div>

                <div className="workload">
                  Carga horária: <span>8 horas</span>
                </div>

                <div className="categories">
                  Categorias: <span>online, pintura</span>
                </div>

                <div className="enrollments">
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
              {course.next_dates?.map((item: any) => (
                <div key={item.date} className="date">
                  <span className="title">{item.date}</span>
                  <div className="divider"></div>
                  <span className="location">{item.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="course__footer">
          <RelatedCourses></RelatedCourses>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Course;
