import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import Header from '../Header/Header'
import './SavedMovies.css'

import { findMovies, findShortMovies } from '../../utils/utils'
import { NOTHING_FOUND_MSG, KEYWORD_REQUIRED_MSG } from '../../utils/constants'

function SavedMovies({ isLoggedIn, addedMovies, isLoading, onDelete, setPopupMessage, setPopupIsOpen }) {
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(addedMovies);
  const [foundedMovies, setFoundedMovies] = useState(showedMovies);
  const [searchRequest, setSearchRequest] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (value) => {
    if (value === undefined || value.length === 0) {
      setPopupMessage(KEYWORD_REQUIRED_MSG)
      setPopupIsOpen(true)
      return
    }
    const moviesList = findMovies(addedMovies, value, shortMovies)
    setSearchRequest(value)
    if (moviesList.length === 0) {
      setNotFound(true)
      setPopupMessage(NOTHING_FOUND_MSG)
      setPopupIsOpen(true)
    } else {
      setNotFound(false)
    }
    setShowedMovies(moviesList)
  }

  const handleShortMovies = () => {
    if (!shortMovies) {
      setShortMovies(true)
      localStorage.setItem('shortAddedMovies', true)
      setFoundedMovies(findShortMovies(foundedMovies))
      findShortMovies(foundedMovies).length === 0 ? setNotFound(true) : setNotFound(false)
    } else {
      setShortMovies(false)
      localStorage.setItem('shortAddedMovies', false)
      foundedMovies.length === 0 ? setNotFound(true) : setNotFound(false)
      setShowedMovies(foundedMovies)
      setFoundedMovies(foundedMovies)
    }
  }

  useEffect(() => {
    localStorage.setItem('shortAddedMovies', shortMovies)
    if (shortMovies) {
      if (searchRequest.trim()) {
        setShowedMovies(findMovies(addedMovies, searchRequest, true))
      } else {
        setShowedMovies(findShortMovies(addedMovies))
      }
    } else {
      const moviesList = findMovies(addedMovies, searchRequest, shortMovies)
      setShowedMovies(moviesList)
    }
  }, [addedMovies, location, shortMovies])

  useEffect(() => {
    setFoundedMovies(addedMovies)
    addedMovies.length !== 0 ? setNotFound(false) : setNotFound(true)
  }, [addedMovies])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="saved-movies">
        <div className="saved-movies__content">
          <SearchForm
            onSearchMovies={handleSearchSubmit}
            onFilter={handleShortMovies}
            shortMovies={shortMovies}
            isSavedMoviesPage={true}
          />
          {isLoading ?
            <Preloader />
            : notFound
          }
          {!isLoading && (
            <MoviesCardList
              isSavedMoviesPage={true}
              movies={showedMovies}
              addedMovies={addedMovies}
              onDelete={onDelete}
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies