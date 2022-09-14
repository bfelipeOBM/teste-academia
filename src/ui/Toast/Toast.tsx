import "./Toast.scss";

import { useEffect, useState } from "react";

interface Props {
  toast: boolean;
}

const Toast = (props: Props) => {
  const [toast, setToast] = useState(props.toast);

  useEffect(() => {
    if (toast) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }
  }, [toast]);

  return (
    <>
      {toast && (
        <div className="toast">
          <div className="toast__content">
            <span className="toast__content__icon material-icons">
              sentiment_satisfied_alt
            </span>
            <span className="toast__content__text">
              Senha redefinida com sucesso!
            </span>
            <div
              className="toast__content__close"
              onClick={() => setToast(false)}
            >
              <span className="material-icons">close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
