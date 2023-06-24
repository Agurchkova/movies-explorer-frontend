import "./Profile.css";
import Header from "../Header/Header";

function Profile ({ isLoggedIn }) {
  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile___form">
          <div className="profile__value">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              name="name"
              required
              placeholder="Виталий" //временно
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
              placeholder="pochta@yandex.ru" //временно
            />
          </div>
          <div className="profile__buttons">
            <button
              className="profile__edit"
              type="submit"
            >
              Редактировать
            </button>
            <button
              className="profile__logout-button"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  )
};

export default Profile;