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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  /// Функции авторизации пользователя

  // handleRegisterSignUp
  const handleRegisterSignUp = (data) => {
    return MainApi.registerSignUp(data)
      .then(() => {
        handleAuthorizeSignIn(data);
      })
      .catch(error => {
          setPopupMessage(error);
          setPopupIsOpen(true);
      });
  };

  // handleAuthorizeSignIn
  const handleAuthorizeSignIn = (data) => {
    return MainApi.authorizeSignIn(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate("/movies", {replace: true})
        Promise.all([MainApi.getData(data.token), MainApi.getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
            console.log(userMovies)

            userMovies.map((m) => {
              MainApi.deleteMovie(m.movieId, data.token)
              .then((card) => {
                console.log("DELETE CARD", card)
              })
              return(m)
            })
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);

          })
      })
      .catch(error => {
        setPopupMessage(error);
        setPopupIsOpen(true);
      });
  };

    // handleTokenCheck
    const handleTokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      MainApi.getData(jwt)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data)
          navigate('/movies', { replace: true });
        })
        .catch((err) => console.log(err));
      MainApi.getSavedMovies(jwt)
        .then((movies) => {
          setSavedMovies(movies)
        })
        .catch((err) => console.log(err));
      };

  /// Функции с фильмами

  // handleSaveMovie
  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      MainApi.deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setPopupIsOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      MainApi.saveMovie(movie, jwt)
        .then((newSavedMovie) => {
//          setSavedMovies((prev) => [...prev, newSavedMovie]);
          setSavedMovies((prev) => [newSavedMovie]);

        })
        .catch((error) => {
          setPopupMessage(error);
          setPopupIsOpen(true);
        })
    }
  }
  // handleDeleteMovie
  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    MainApi.deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setPopupIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /// Функции попапа

  //handleClosePopup
  const handleClosePopup = () => {
    setPopupIsOpen(false);
    setPopupMessage('');
  };

  /// Функции для обновления данных пользователя

  //handleUpdateUserInfo
  const handleUpdateUserInfo = (updatedData) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    MainApi.updateUserData(updatedData, jwt)
      .then((info) => {
        setCurrentUser(info);
        setPopupMessage('Профиль успешно отредактирован!');
        setPopupIsOpen(true);
      })
      .catch(err => {
        console.log(err);
        setPopupMessage({ message: 'При обновлении профиля произошла ошибка' });
        setPopupIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //handleLogOut
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    localStorage.clear();
    navigate('/', { replace: true })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route 
            index element={
              <Main />
            } 
          />
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
              <Login
                onLogin={handleAuthorizeSignIn}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/movies" element={
              <ProtectedRoute 
                component={Movies} 
                  isLoggedIn={isLoggedIn} 
                  isLoading={isLoading}
                  onLoading={setIsLoading}
                  savedMovies={savedMovies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  setPopupMessage={setPopupMessage}
                  setPopupIsOpen={setPopupIsOpen}
              />
            }
          />
          <Route path="/saved-movies" element={
              <ProtectedRoute 
                component={SavedMovies} 
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                  setPopupMessage={setPopupMessage}
                  setPopupIsOpen={setPopupIsOpen}
              />
            }
          />
          <Route 
            path="*" 
            element={
              <NotFoundPage />
            } 
          />
          <Route path="/profile" element={
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
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;