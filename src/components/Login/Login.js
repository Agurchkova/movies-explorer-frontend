import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import logo from "../../images/logo.svg";

function Login({ onLogin }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  return (
    <section className="login">
      <div className="login__header">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="login__input"
          id="email"
          type="email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="login__error">{errors.email}</span>
        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login__input"
          id="password"
          type="password"
          name="password"
          minLength={8}
          maxLength={30}
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="login__error">{errors.password}</span>
        <button
          className="login__signin-button"
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <div className="login__caption">
        <span>Ещё не зарегистрированы?</span>
        <Link to="signup" className="login__signup-button">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
