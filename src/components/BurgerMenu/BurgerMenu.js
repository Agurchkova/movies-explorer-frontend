import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu ({ onClose }) {
  const location = useLocation().pathname;

  return (
    <div className={location === "/" ? "burger__no" : "burger" }>
      <div className="burger__page">
        <div className="burger__container">
          <button 
            className="burger__close-button"
            type="button"
            onClick={() => onClose()}
          />
          <div className="burger__menu">
            <NavLink to="/" 
              className={location === "/" 
              ? "burger__menu-link burger__menu-link_active" 
              : "burger__menu-link"}>
              Главная
            </NavLink>
            <NavLink to="/movies"
              className={location === "/movies" 
              ? "burger__menu-link burger__menu-link_active" 
              : "burger__menu-link"}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" 
              className={location === "/saved-movies" 
              ? "burger__menu-link burger__menu-link_active" 
              : "burger__menu-link"}>
              Сохранённые фильмы
            </NavLink>
          </div>
            <Link 
              to="/profile"
              className="burger__button-account">
                Аккаунт
            </Link>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;