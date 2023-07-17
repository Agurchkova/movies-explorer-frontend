import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import * as MainApi from "../../utils/MainApi";
import {
  PROFILE_EDITED_MSG,
  PROFILE_EDIT_ERROR_MSG,
  QUERY_ERROR_MSG,
} from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [addedMovies, setAddedMovies] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  // авторизирует при открытии/перезагрузке страницы
  useEffect(() => {
    handleTokenCheck();
  }, []);

  // добавляет фильмы пользователя на страницу
  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      MainApi.getAddedMovies(jwt)
        .then((allMovies) =>
          setAddedMovies(
            allMovies.filter((movie) => movie.owner === currentUser._id)
          )
        )
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, currentUser]);

  /// Функции авторизации пользователя

  // handleRegisterSignUp
  function handleRegisterSignUp(data) {
    return MainApi.registerSignUp(data)
      .then(() => {
        handleAuthorizeSignIn(data);
      })
      .catch((error) => {
        setPopupMessage(error);
        setPopupIsOpen(true);
      });
  }

  // handleAuthorizeSignIn
  function handleAuthorizeSignIn(data) {
    return MainApi.authorizeSignIn(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/movies", { replace: true });
        Promise.all([
          MainApi.getData(data.token),
          MainApi.getAddedMovies(data.token),
        ])
          .then(([userInfo, allMovies]) => {
            const currentUserMovies = allMovies.filter(
              (movie) => movie.owner === userInfo._id
            );
            setCurrentUser(userInfo);
            localStorage.setItem(
              "savedMovies",
              JSON.stringify(currentUserMovies)
            );
            setAddedMovies(currentUserMovies);
          })
          .catch((error) => {
            console.log(error);
            setPopupMessage(QUERY_ERROR_MSG);
            setPopupIsOpen(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setPopupMessage(error);
        setPopupIsOpen(true);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    MainApi.getData(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }

  /// Функции с фильмами

  //handleClickMovie
  function handleClickMovie(movie) {
    const jwt = localStorage.getItem("jwt");
    const handledMovie = addedMovies.find((card) => {
      return card.movieId === movie.id;
    });
    const isAdded = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isAdded) {
      MainApi.deleteMovie(id, jwt)
        .then((card) => {
          const updatedAddedMovies = addedMovies.filter(
            (item) => card._id !== item._id
          );
          localStorage.setItem("addedMovies", updatedAddedMovies);
          setAddedMovies(updatedAddedMovies);
        })
        .catch((error) => {
          setPopupMessage(error);
          setPopupIsOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      MainApi.addMovie(movie, jwt)
        .then((newAddedMovie) => {
          setAddedMovies((prev) => [...prev, newAddedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setPopupIsOpen(true);
        });
    }
  }
  // handleDeleteMovie
  function handleDeleteMovie(movie) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    MainApi.deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedAddedMovies = addedMovies.filter(
          (item) => card._id !== item._id
        );
        localStorage.setItem("savedMovies", updatedAddedMovies);
        setAddedMovies(updatedAddedMovies);
      })
      .catch((error) => {
        setPopupMessage(error);
        setPopupIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /// Функции попапа

  //handleClosePopup
  function handleClosePopup() {
    setPopupIsOpen(false);
    setPopupMessage("");
  }

  //закрывает попап по нажатию на кнопку Escape
  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === "Escape") {
        handleClosePopup();
      }
    }
    if (popupIsOpen) {
      document.addEventListener("keydown", closePopupByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
      };
    }
  }, [popupIsOpen]);

  //закрывает попап по нажатию на область вне попапа
  useEffect(() => {
    function closeByClickOnOverlay(event) {
      if (event.target.classList.contains("popup_opened")) {
        handleClosePopup();
      }
    }
    if (popupIsOpen) {
      document.addEventListener("mousedown", closeByClickOnOverlay);
      return () => {
        document.removeEventListener("mousedown", closeByClickOnOverlay);
      };
    }
  }, [popupIsOpen]);

  /// Функции для обновления данных пользователя

  //handleUpdateUserInfo
  function handleUpdateUserInfo(updatedData) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    MainApi.updateUserData(updatedData, jwt)
      .then(() => {
        setCurrentUser(updatedData);
        setPopupMessage(PROFILE_EDITED_MSG);
        setPopupIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setPopupMessage(PROFILE_EDIT_ERROR_MSG);
        setPopupIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //handleLogOut
  function handleLogOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setPopupMessage("");
    setAddedMovies([]);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route index element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegisterSignUp}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login onLogin={handleAuthorizeSignIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                onLoading={setIsLoading}
                addedMovies={addedMovies}
                isAdded={handleClickMovie}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setPopupIsOpen={setPopupIsOpen}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                addedMovies={addedMovies}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setPopupIsOpen={setPopupIsOpen}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                onUpdateUser={handleUpdateUserInfo}
                onSignOut={handleLogOut}
              />
            }
          />
        </Routes>
        <InfoToolTip
          isPopupOpen={popupIsOpen}
          onPopupClose={handleClosePopup}
          infoMessage={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;