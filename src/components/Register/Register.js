import React from 'react';
import { Link } from "react-router-dom";
import "./Register.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import logo from "../../images/logo.svg";

function Register ({ onRegister }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <>
    <section className="register">
      <div className="register__header">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>
        <h1 
          className="register__title">Добро пожаловать!
        </h1>
      </div>
      <form 
        className="form register__form" 
          onSubmit={handleSubmit}>
          <label 
            className="register__label" 
            htmlFor="name">Имя
          </label>
          <input
            className="register__input"
            id="name"
            type="text"
            minLength={2}
            required
            name="name"
            value={values.name || ''}
            onChange={handleChange}
          />
          <span 
            className="register__error">{errors.name}
          </span>
          <label 
            className="register__label" 
            htmlFor="email">E-mail
          </label>
          <input
            className="register__input"
            id="email"
            type="email"
            name="email"
            required
            value={values.email || ''}
            onChange={handleChange}
          />
          <span 
            className="register__error">{errors.email}
          </span>
          <label 
            className="register__label" 
            htmlFor="password">Пароль
          </label>
          <input
            className="register__input"
            id="password"
            type="password"
            name="password"
            minLength={6}
            required
            value={values.password || ''}
            onChange={handleChange}
          />
          <span 
            className="register__error">{errors.password}
          </span>
          <button 
            className="register__button" 
            type="submit" 
            disabled={!isValid}>Зарегистрироваться
          </button>
        </form>
        <div 
          className="register__bottom">
            <span>
              Уже зарегистрированы?
            </span>
          <Link 
            to="/signin" 
            className="register__signin-button">Войти
          </Link>
        </div>
    </section>
    </>

  )
};

export default Register;