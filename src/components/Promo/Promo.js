import React from "react";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <ul className="promo__list">
          <li>
            <a className="promo__list-link" href="#about-project">
              О&nbsp;проекте
            </a>
          </li>
          <li>
            <a className="promo__list-link" href="#techs">
              Технологии
            </a>
          </li>
          <li>
            <a className="promo__list-link" href="#student">
              Студент
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Promo;
