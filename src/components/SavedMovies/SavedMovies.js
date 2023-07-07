import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import "./SavedMovies.css";

import { filterMovies, filterShortMovies } from '../../utils/utils';

function SavedMovies ({ 
  isLoggedIn,  
  savedMovies,
  isLoading,
  onDelete,
  setPopupMessage,
  setPopupIsOpen }) {

    const [shortMovies, setShortMovies] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showedMovies, setShowedMovies] = useState(savedMovies);
    const [filteredMovies, setFilteredMovies] = useState(showedMovies);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim().length === 0) {
      setPopupMessage('Необходимо ввести ключевое слово');
      setPopupIsOpen(true);
      return;
    }

    const moviesList = filterMovies(savedMovies, inputValue, shortMovies);
    setSearchQuery(inputValue);
      if (moviesList.length === 0) {
        setNotFound(true);
        setPopupMessage('Ничего не найдено');
        setPopupIsOpen(true);
      } else {
        setNotFound(false);
        setFilteredMovies(moviesList);
        setShowedMovies(moviesList);
      }
  }

  const handleShortFilms = () => {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMovies(false);
      const moviesList = filterMovies(savedMovies, searchQuery, shortMovies);
      setShowedMovies(moviesList);
    }
  }, [savedMovies, location, shortMovies]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMovies]);

    return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        <section className="saved-movies">
          <div className="saved-movies__content">
            <SearchForm
              onSearchMovies={handleSearchSubmit}
              onFilter={handleShortFilms}
              shortMovies={shortMovies}
              isSavedMoviesPage={true}
            />
            {isLoading && (
              <Preloader />
            )}
            {!isLoading && (
              <MoviesCardList
                isSavedMoviesPage={true}
                movies={showedMovies}
                savedMovies={savedMovies}
                onDelete={onDelete} 
              />
            )}
          </div>
        </section>
        <Footer />
      </>
    
  )
};

export default SavedMovies;