import { FormatToBrazilianDate } from "@/application/common/Utils";
import { Class } from "@/application/models/class";
import { Course as currentCourse } from "@/application/models/course";
import { ApplicationState } from "@/application/store";
import { getCourseClasses } from "@/application/store/classes/action";
import {
  getCourse,
  getCourseMaterial,
  getMyCourses,
} from "@/application/store/courses/action";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import CustomModal from "@/ui/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast, ToastContainer } from "react-toastify";
import RelatedCourses from "../RelatedCourses/RelatedCourses";
import "./Course.scss";

const Course = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(true);
  const [nextClassDate, setNextClassDate] = useState("");
  const [disabledEnrollButton, setDisabledEnrollButton] = useState(false);
  const [enrollButtonText, setEnrollButtonText] = useState("Inscreva-se");
  const [downloadMaterialButtonText, setDownloadMaterialButtonText] = useState(
    "Material indisponível"
  );
  const [disabledDownloadMaterialButton, setDisabledDownloadMaterialButton] =
    useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<Class>();

  const { course } = useSelector((state: ApplicationState) => state.course);
  const { classes } = useSelector((state: ApplicationState) => state.classes);
  const { data: message } = useSelector(
    (state: ApplicationState) => state.message
  );
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const user = useSelector((state: ApplicationState) => state.user);
  const { mycourses } = useSelector(
    (state: ApplicationState) => state.mycourses
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadCourse = async () => {
    setLoading(true);
    if (id) {
      await dispatch(getCourse(parseInt(id)) as any);
    }
    setLoading(false);
  };

  const loadClasses = async () => {
    setLoading(true);
    if (course.id) {
      await dispatch(getCourseClasses(course) as any);
      if (classes.length > 1) {
        const firstClassDate = new Date(classes[0].date);
        const currentDate = new Date();
        console.log(classes[1])
        if (currentDate > firstClassDate) {
          setCurrentClass(classes[1]);
        } else {
          setCurrentClass(classes[0]);
        }
      } else if (classes.length && classes[0]) {
        setCurrentClass(classes[0]);
      }
    }
    setLoading(false);
  };

  const loadAlreadyEnrolled = async () => {
    setLoading(true);
    if (profile.id) {
      await dispatch(getMyCourses(profile) as any);
    }
    setLoading(false);
  };

  const enrolledStudentsText = (enrolled: any) => {
    return classes.length > 0
      ? `${enrolled} de ${currentClass?.max_students} alunos matriculados`
      : "";
  };

  const handleEnroll = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.isLoggedIn) {
      if (classes.length && currentClass) {
        setIsModalOpen(true);
        setCurrentClass(currentClass);
      }
    } else {
      navigate("/login");
    }
  };

  const downloadCourseMaterial = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (user.isLoggedIn) {
      try {
        if (course.id && currentClass) {
          await dispatch(
            getCourseMaterial(course.id, currentClass.class_id) as any
          );
        }
      } catch {
        toast.warn(`${message.detail}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      navigate("/login");
    }
  };

  const handleDisabledButtons = async (
    myCourses: currentCourse[],
    currentClasses: any
  ) => {
    setLoadingButton(true);

    if (
      myCourses.length > 0 &&
      myCourses.some((c) => c.course_id == course.id)
    ) {
      setDisabledEnrollButton(true);
      setEnrollButtonText("Inscrito");
    } else if (!currentClasses) {
      setDisabledEnrollButton(true);
      setEnrollButtonText("Em breve");
    } else if (
      currentClasses &&
      currentClasses.max_students <= currentClasses.students_count
    ) {
      setDisabledEnrollButton(true);
      setEnrollButtonText("Inscrição Indisponível");
    } else {
      setDisabledEnrollButton(false);
      setEnrollButtonText("Inscreva-se");
    }

    if (currentClasses && currentClasses.hasMaterials) {
      setDisabledDownloadMaterialButton(false);
      setDownloadMaterialButtonText("Baixar material de apoio");
    }

    setLoadingButton(false);
  };

  useEffect(() => {
    loadAlreadyEnrolled();
    window.scrollTo(0, 0);
    if (id) {
      loadCourse();
    }
  }, []);
  console.log(course?.upcoming_classes)
  useEffect(() => {
    if (course?.upcoming_classes) {
      if (course.upcoming_classes.length > 1) {
        const firstClassDate = new Date(course.upcoming_classes[0].date);
        const currentDate = new Date();
        if (currentDate > firstClassDate) {
          setNextClassDate(FormatToBrazilianDate(course.upcoming_classes[1].date));
        } else {
          setNextClassDate(FormatToBrazilianDate(course.upcoming_classes[0].date));
        }
      } else {
        setNextClassDate(FormatToBrazilianDate(course.upcoming_classes[0].date));
      }
    }
    // if (
    //   course?.upcoming_classes &&
    //   course.upcoming_classes.length > 0 &&
    //   course.upcoming_classes[0].date
    // ) {
    //   setNextClassDate(FormatToBrazilianDate(course.upcoming_classes[0].date));
    // }

    if (course) {
      loadClasses();
    }
  }, [course]);

  useEffect(() => {
    handleDisabledButtons(mycourses, currentClass);
  }, [mycourses, classes]);

  return (
    <>
      <CustomModal
        isOpen={isModalOpen}
        currentClass={currentClass}
        onClose={() => setIsModalOpen(false)}
        enrolledOnClass={async () => {
          setDisabledEnrollButton(true);
          setEnrollButtonText("Inscrito");
          loadClasses();
        }}
      ></CustomModal>
      <ToastContainer />
      <Header></Header>
      {!loading && course && mycourses && (
        <div className="course">
          <div className="course__header">
            <div className="course__header__title">
              CURSO <span> {course.name}</span>
            </div>
          </div>
          <div className="course__content">
            <div className="course__info">
              <div className="course__info__video">
                {!course.video && !course.short_video && course.image && (
                  <img
                    src={course.image}
                    alt="Imagem do curso"
                    width="100%"
                    height="100%"
                  />
                )}
                {(course.video || course.short_video) && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={course.video || course.short_video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
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
                  <div
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
                <div className="share">
                  <span className="share__title">Compartilhar: </span>
                  <span className="share__buttons">
                    <LinkedinShareButton
                      url={window.location.href}
                      title={course.name}
                      summary={course.description}
                      source="https://academiadeprofissionais.obramax.com.br"
                      className="share__button"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    <FacebookShareButton
                      url={window.location.href}
                      quote={course.name}
                      className="share__button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={window.location.href}
                      title={course.name}
                      className="share__button"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
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
                  <div className="partner">
                    Parceiro:{" "}
                    {classes.length > 0 && currentClass?.partner && (
                      <span>{currentClass.partner} </span>
                    )}
                  </div>

                  <div className="date">
                    Data: <span>{nextClassDate}</span>
                  </div>

                  <div className="workload">
                    Carga horária: <span>{course.workload}h</span>
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
                    {enrolledStudentsText(currentClass?.students_count)}
                    {classes.length > 0 &&
                      classes[0]?.students_count == currentClass?.max_students && (
                        <span> - Turma lotada</span>
                      )}
                  </div>
                </div>

                {!loadingButton && (
                  <div className="download">
                    <button
                      disabled={disabledDownloadMaterialButton}
                      onClick={downloadCourseMaterial}
                    >
                      <i className="material-icons-outlined">cloud_download</i>{" "}
                      {downloadMaterialButtonText}
                    </button>
                  </div>
                )}
              </div>

              {!loadingButton && (
                <div className="course__details__subscribe">
                  <button
                    disabled={disabledEnrollButton}
                    onClick={handleEnroll}
                  >
                    {enrollButtonText}
                  </button>
                </div>
              )}

              <div className="course__details__next-dates">
                <span className="title">Próximas datas</span>
                {classes?.length > 0 &&
                  classes.map((item: Class) => (
                    <div key={item.date} className="date">
                      <span className="title">
                        {FormatToBrazilianDate(item.date)}
                      </span>
                      <div className="divider"></div>
                      <span className="location">{item?.location_name}</span>
                    </div>
                  ))}
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
