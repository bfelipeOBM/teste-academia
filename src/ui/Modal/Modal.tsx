import { navigateToExternalUrl } from "@/application/common/Utils";
import { Class } from "@/application/models/class";
import { ApplicationState } from "@/application/store";
import { enrollOnClass } from "@/application/store/classes/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClass?: Class;
  enrolledOnClass: () => void;
}

//TODO: Make this modal customizable!

const CustomModal = ({
  isOpen,
  onClose,
  currentClass,
  enrolledOnClass,
}: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const { data: message } = useSelector(
    (state: ApplicationState) => state.message
  );
  const { profile } = useSelector((state: ApplicationState) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const enrollToCurrentClass = async () => {
    try {
      if (currentClass) {
        await dispatch(
          enrollOnClass(currentClass.id, currentClass.class_id, profile) as any
        );
        if (currentClass.sympla_url) {
          navigateToExternalUrl(currentClass.sympla_url);
        }
        toast.success("Sucesso ao se inscrever!", {
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
      enrolledOnClass();
      handleClose();
    } catch {
      toast.error(`${message.detail}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      handleClose();
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        centered
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        toggle={() => setIsModalOpen(!isModalOpen)}
        className="custom-modal"
        modalClassName="custom-modal-content"
      >
        <ModalHeader>
          FINALIZAÇÃO DE INSCRIÇÃO
          <div className="borderBottom"></div>
        </ModalHeader>
        <ModalBody>
          <div className="current-class-card">
            <div className="current-class-card__image">
              <img
                src={currentClass?.image}
                width="100%"
                height="100%"
                alt="Class"
              />
            </div>
            <div className="current-class-card__content">
              <div className="current-class-card__content__header">
                <span>Você está prestes a inscrever-se no curso</span>
              </div>
              <div className="current-class-card__content__name-description">
                <div className="name">{currentClass?.name}</div>
                <div className="description">{currentClass?.description}</div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <i className="material-icons ">arrow_back</i>
            Voltar
          </Button>
          <Button color="primary" onClick={enrollToCurrentClass}>
            Inscrever-se
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CustomModal;
