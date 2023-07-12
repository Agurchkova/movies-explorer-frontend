import React from "react";
import { useNavigate  } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage () {
  const navigate = useNavigate();

  function handleClickBackButton() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="page__notfound">
      <div className="page__container">
        <p className="page__status">404</p>
          <h1 className="page__text">
            Страница не найдена
          </h1>
            <button
              className="page__back-button"
              type="button"
              onClick={handleClickBackButton}
            >
              Назад
            </button>
      </div>
    </div>
  )
};

export default NotFoundPage;