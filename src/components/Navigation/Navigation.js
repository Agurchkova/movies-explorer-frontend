import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation ({ isLoggedIn }) {

  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div 
            className={location === "/" 
            ? "navigation__movies navigation__movies_light" 
            : "navigation__movies"}>
            <Link
              to="/movies"
              className={location === "/movies" 
              ? "navigation__movies-link_active" 
              : "navigation__movies-link"}>
                Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={location === "/saved-movies" 
              ? "navigation__movies-link_active" 
              : "navigation__movies-link"}>
                Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button 
                className="navigation__account-button">
                  Аккаунт
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="navigation__auth">
          <Link to="/signup" 
            className="navigation__signup-link">
              Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__signin-button">
              Войти
            </button>
          </Link>
        </div>
      )}
      {!isBurgerMenuOpen && isLoggedIn ? (
        <button
          className={location === "/" 
          ? "burger__button burger__button_light" 
          :"burger__button"}
          onClick={toggleBurgerMenu}
        />
      ) : <BurgerMenu onClose={toggleBurgerMenu} />
      }
    </nav>
  )
};

export default Navigation;
