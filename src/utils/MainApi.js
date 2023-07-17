import { BASE_API_URL, _checkResponse } from "./constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const registerSignUp = ({ name, email, password }) => {
  return fetch(`${BASE_API_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => _checkResponse(res));
};

export const authorizeSignIn = ({ email, password }) => {
  return fetch(`${BASE_API_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => _checkResponse(res));
};

export const getData = (jwt) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => _checkResponse(res));
};

export const updateUserData = (data, jwt) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => _checkResponse(res));
};

export const getAddedMovies = (jwt) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => _checkResponse(res));
};

export const addMovie = async (movie, jwt) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country: movie.country ? movie.country : "Страна не указана",
      director: movie.director ? movie.director : "Режиссер не указан",
      duration: movie.duration,
      year: movie.year ? movie.year : "Год не указан",
      description: movie.description
        ? movie.description
        : "Описание не указано",
      image: "https://api.nomoreparties.co/" + movie.image.url,
      trailerLink: movie.trailerLink
        ? movie.trailerLink
        : "Трейлер отсутствует",
      thumbnail:
        "https://api.nomoreparties.co/" + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      owner: movie.owner,
      nameRU: movie.nameRU
        ? movie.nameRU
        : "Название на русском языке не указано",
      nameEN: movie.nameEN
        ? movie.nameEN
        : "Назввание на английском языке не указано",
    }),
  }).then((res) => _checkResponse(res));
};

export const deleteMovie = (id, jwt) => {
  return fetch(`${BASE_API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => _checkResponse(res));
};
