import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu ({ onClose }) {
  const location = useLocation().pathname;

  return (
    <div className={location === "/" ? "burger-no" : "burger" }>
      <div className="burger__page">
        <div className="burger__container">
          <button 
            className="burger__close-button"
            type="button"
            onClick={() => onClose()}
          />
          <div className="burger__menu">
            <NavLink exact to="/" 
              className={location === "/" ? "burger-link_active" : "burger-link"}
              activeClassName="burger-link_active">
              Главная
            </NavLink>
            <NavLink to="/movies"
              className={location === "/movies" ? "burger-link_active" : "burger-link"}
              activeClassName="burger-link_active">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" 
              className={location === "/saved-movies" ? "burger-link_active" : "burger-link"}
              activeClassName="burger-link_active">
              Сохранённые фильмы
            </NavLink>
          </div>
            <Link to="/profile">
              <button className="burger__button_account">
                Аккаунт
              </button>
            </Link>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;