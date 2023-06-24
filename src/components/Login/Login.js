import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login () {
  return (
    <section className="login">
      <div className="login__header">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="login__logo"
          />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form form">
        <label className="login__label" htmlFor="email">E-mail</label>
        <input
          className="login__input"
          type="email"
          id="email"
          name="email"
          required
        />
        <span className="login__error">Что-то пошло не так...</span>
        <label className="login__label" htmlFor="password">Пароль</label>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          required
        />
        <span className="login__error">Что-то пошло не так...</span>
        <button className="login__button" type="submit">Войти</button>
      </form>
      <div className="login__bottom">
        <span>Ещё не зарегистрированы?</span>
        <Link to="signup" className="login__link">Регистрация</Link>
      </div>
    </section>
  )
};

export default Login;