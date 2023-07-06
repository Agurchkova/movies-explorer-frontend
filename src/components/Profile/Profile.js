import { useEffect, useContext, useState } from 'react';
import "./Profile.css";
import Header from "../Header/Header";
import Form from "../Form/Form";
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile ({ onUpdateUser, onSignOut, isLoggedIn, onLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [isCurrentUser, setUserDifference] = useState(true);
  const [isEditingBegun, setEditingStatus] = useState(false);
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  // useEffect(() => {
  //   currentUser ? resetForm(currentUser) : resetForm();
  // }, [currentUser, resetForm]);

  // const isVisible = (!isValid || (currentUser.name === values.name 
  // && currentUser.email === values.email));

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setUserDifference(false)
      : setUserDifference(true);
  }, [currentUser, values]);

  useEffect(() => {
    resetForm(false, currentUser);
  }, [resetForm, currentUser]);

 function handleEditClick() {
    setEditingStatus(!isEditingBegun);
  }
  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <Form 
            name="profile___form" 
            onSubmit={handleSubmit}
            isValid={isValid}
            isCurrentUser={isCurrentUser}
            isEditingBegun={isEditingBegun}
            buttonText={onLoading ? "Сохранение..." : "Сохранить"}>
          <div className="profile__value">
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
              disabled={isEditingBegun && !onLoading ? false : true}
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
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
              disabled={isEditingBegun && !onLoading ? false : true}
            />
          </div>
          <div className={`profile__buttons ${isEditingBegun ? "profile__buttons_hidden" : ""
          }`}>
            <button
              className="profile__edit-button"
              type="submit"
              // disabled={isVisible}
              onClick={handleEditClick}
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
        </Form>
      </div>
    </section>
    </>
  )
};

export default Profile;
