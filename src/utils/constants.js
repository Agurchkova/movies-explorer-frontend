export const MOVIES_API_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const BASE_API_URL = "https://api.agurchkova.movies.nomoredomains.rocks";
// export const BASE_API_URL = "http://localhost:4000";

export const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// regular expression
export const REG_EXP_USER_NAME = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

// desktops and quantities of movies on the screen
export const QUANTITY_MOVIES_DESKTOP = 12;
export const QUANTITY_MOVIES_MIDDLE_SCREEN = 8;
export const QUANTITY_MOVIES_MOBILE_SCREEN = 5;
export const MORE_QUANTITY_MOVIES_DESKTOP = 4;
export const MORE_QUANTITY_MOVIES_MOBILE_SCREEN = 2;
export const WIDTH_DESKTOP_SCREEN = 950;
export const WIDTH_MOBILE_SCREEN = 450;

// errors messages
export const NOTHING_FOUND_MSG = "Ничего не найдено";
export const KEYWORD_REQUIRED_MSG = "Необходимо ввести ключевое слово";
export const QUERY_ERROR_MSG =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const PROFILE_EDITED_MSG = "Профиль успешно отредактирован!";
export const PROFILE_EDIT_ERROR_MSG =
  "При обновлении профиля произошла ошибка. Указанный адрес почты уже зарегистрирован";
export const WRONG_EMAIL_MSG = "Введен некорректный адрес почты";
