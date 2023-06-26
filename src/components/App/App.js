import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import moviesCards from "../../temporary/cards.json";
import moviesSavedCards from "../../temporary/savedCards.json";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false);

  //временно
  useEffect(() => { 
    setIsLoggedIn(true);
  }, [isLoggedIn]);

  //временно
  useEffect(() => {
      setCards(moviesCards);
      setSavedCards(moviesSavedCards);
  }, []);

  function handleCardLike() {
    setLike(!isLiked);
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          index element={
            <Main />
          } 
        />
        <Route 
          path="/signup" 
          element= {
            <Register />
          } 
        />
        <Route 
          path="/signin" 
          element={
            <Login />
          } 
        />
        <Route 
          path="/movies" 
          element={
            <Movies 
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              cards={cards}
              isLiked={isLiked}
              onCardLike={handleCardLike}
            />
          } 
        />
        <Route 
          path="/saved-movies" 
          element={
            <SavedMovies 
              cards={savedCards}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            />
          } 
        />
        <Route 
          path="*" 
          element={
            <NotFoundPage />
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Profile
              isLoggedIn={isLoggedIn}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
