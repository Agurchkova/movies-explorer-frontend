import { useEffect, useContext } from 'react';
import "./Profile.css";
import Header from "../Header/Header";
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile ({ onUpdateUser, onSignOut, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isVisible = (!isValid || (currentUser.name === values.name 
  && currentUser.email === values.email));

  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form 
            className="profile___form form" 
            onSubmit={handleSubmit}>
          <div className="profile__field">
            <label className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              name="name"
              required
              placeholder="name"
              value={values.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="profile__border-line"></div>
          <div className="profile__field">
            <label className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              name="email"
              required
              placeholder="email"
              value={values.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="profile__buttons">
            <button
              className="profile__edit-button"
              type="submit"
              disabled={isVisible}
            >
              Редактировать
            </button>
            <button
              className="profile__logout-button"
              type="button"
              onClick={() => onSignOut()}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
};

export default Profile;
