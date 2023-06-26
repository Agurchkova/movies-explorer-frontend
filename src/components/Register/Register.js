import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register () {
  return (
    <section className="register">
      <div className="register__header">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>
      <form className="form register__form">
        <label className="register__label" htmlFor="name">Имя</label>
        <input
          className="register__input"
          type="text"
          minLength={2}
          required
          id="name"
          name="name"
        />
        <span className="register__error">Что-то пошло не так...</span>
        <label className="register__label" htmlFor="email">E-mail</label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          required
        />
        <span className="register__error">Что-то пошло не так...</span>
        <label className="register__label" htmlFor="password">Пароль</label>
        <input
          className="register__input"
          type="password"
          id="password"
          name="password"
          minLength={6}
          required
        />
        <span className="register__error">Что-то пошло не так...</span>
        <button className="register__button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__bottom">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__signin-button">Войти</Link>
      </div>
    </section>
  )
};

export default Register;