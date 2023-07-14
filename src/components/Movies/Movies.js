import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from '../../utils/MoviesApi';
import { findMovies, findShortMovies } from '../../utils/utils';
import { NOTHING_FOUND_MSG, KEYWORD_REQUIRED_MSG } from '../../utils/constants';

function Movies ({ 
  isLoggedIn, 
  onLoading, 
  addedMovies,
  isAdded,
  isLoading,
  setPopupMessage,
  setPopupIsOpen }) {

  const [shortMovies, setShortMovies] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const location = useLocation();

  const handleSearchMovies = (movies, userSearch, shortMoviesCheckbox) => {
    const moviesList = findMovies(movies, userSearch, false);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage(NOTHING_FOUND_MSG);
      setPopupIsOpen(true);
    } else {
      setNotFound(false);
    }
    setAllMovies(moviesList);
    setFoundedMovies(
      shortMoviesCheckbox ? findShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  const handleSearchSubmit = (value) => {
    if (value === undefined || value.length === 0) {
      setPopupMessage(KEYWORD_REQUIRED_MSG);
      setPopupIsOpen(true);
      return;
    }

    localStorage.setItem('movieSearch', value);
    localStorage.setItem('shortMovies', shortMovies);

    if (isAllMovies.length === 0) {
      onLoading(true);
      moviesApi
        .getMovies()
        .then(movies => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setIsAllMovies(movies);
          handleSearchMovies(
            movies,
            value,
            shortMovies
          );
        })
        .catch((error) => {
          setPopupMessage(error);
          setPopupIsOpen(true);
        })
        .finally(() => onLoading(false));
    } else {
      handleSearchMovies(isAllMovies, value, shortMovies);
    }
  }

  const handleShortMovies = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFoundedMovies(findShortMovies(allMovies));
      if (findMovies.length === 0) {
        setNotFound(true);
      }
    } else {
      setFoundedMovies(allMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setAllMovies(movies);
      if (
        localStorage.getItem('shortMovies') === 'true'
      ) {
        setFoundedMovies(findShortMovies(movies));
      } else {
        setFoundedMovies(movies);
      }
    }
  }, [location]);

  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="movies">
      <div className="movies__content">
      <SearchForm
        onSearchMovies={handleSearchSubmit}
        onFilter={handleShortMovies}
        shortMovies={shortMovies}
      />
      {isLoading && (
          <Preloader />
        )}
    {!isLoading &&
      <MoviesCardList 
        isSavedMoviesPage={false}
        movies={foundedMovies}
        addedMovies={addedMovies}
        isAdded={isAdded}
      />
      }
      </div>
    </section>
    <Footer />
    </>
  )
};

export default Movies;