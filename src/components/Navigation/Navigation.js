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
              ? "navigation__movies-link navigation__movies-link_active" 
              : "navigation__movies-link"}>
                Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={location === "/saved-movies" 
              ? "navigation__movies-link navigation__movies-link_active" 
              : "navigation__movies-link"}>
                Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link 
              to="/profile"
              className="navigation__account-button">
                Аккаунт
            </Link>
          </div>
        </>
      ) : (
        <div className="navigation__auth">
          <Link to="/signup" 
            className="navigation__signup-link">
              Регистрация
          </Link>
          <Link to="/signin"
            className="navigation__signin-button">
              Войти
          </Link>
        </div>
      )}
      {!isBurgerMenuOpen && isLoggedIn ? (
        <button
          className={location === "/" 
          ? "navigation__burger-button navigation__burger-button_light" 
          : "navigation__burger-button"}
          onClick={toggleBurgerMenu}
        />
      ) : <BurgerMenu onClose={toggleBurgerMenu} />
      }
    </nav>
  )
};

export default Navigation;
