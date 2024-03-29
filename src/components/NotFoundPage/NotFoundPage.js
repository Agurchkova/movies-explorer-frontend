import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page__notfound">
      <div className="page__container">
        <p className="page__status">404</p>
        <h1 className="page__text">Страница не найдена</h1>
        <button
          className="page__back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
//
