import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation, redirect } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn])

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    MainApi.getContent(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        navigate("/movies", { replace: true });
      })
      .catch((err) => console.log(err));
      MainApi.getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => console.log(err));
  };

  /*--------------------- Authorization ---------------------- */

  const handleRegistration = async ({ name, email, password }) => {
    return MainApi.registerSignUp({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return MainApi.authorizeSignIn(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate("/movies", {replace: true});
        Promise.all([MainApi.getContent(data.token), MainApi.getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
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
        setIsPopupOpen(true);
      });
  };

  /* --------------------- Movie cards' functions --------------------- */

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
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      MainApi.saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
    }
  }

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
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /*--------------- Popup function ------------ */

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  /* Update user's email and name */

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    MainApi.updateUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Профиль успешно отредактирован!');
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage('При обновлении профиля произошла ошибка');
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // log out function

  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate('/');
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
                onRegister={handleRegistration}
                isLoggedIn={isLoggedIn}
              />
            }
          />
         <Route
            path="/signin"
            element={
              <Login
                onLogin={handleAuthorization}
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
                  setIsPopupOpen={setIsPopupOpen}
              />
            }
          />
          <Route path="/saved-movies" element={
              <ProtectedRoute 
                component={SavedMovies} 
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                  setPopupMessage={setPopupMessage}
                  setIsPopupOpen={setIsPopupOpen}
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
                  onUpdateUser={handleUpdateUser}
                  onSignOut={handleSignOut}
              />
            }
          />
        </Routes>
        <InfoToolTip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;