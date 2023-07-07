import React, { useEffect, useState } from 'react';
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import useFormWithValidation from '../../../hooks/useFormWithValidation';

function SearchForm ({
  onSearchMovies,
  onFilter,
  disabled,
  isSavedMoviesPage,
  shortMovies, }) {
    const { values, handleChange, resetForm, isValid } = useFormWithValidation();
    const location = useLocation();

    function handleFormSubmit(e) {
      e.preventDefault();
      onSearchMovies(values.searchRequest, isValid, shortMovies);
    }
  
    function handleSavedMoviesFormSubmit(e) {
      e.preventDefault()
      onSearchMovies(values.searchRequest, shortMovies, resetForm);
    }
  
    useEffect(() => {
      if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
        const searchValue = localStorage.getItem('movieSearch');
        values.searchRequest = searchValue;
      }
    }, [location]);

  return (
    <section 
      className="search">
        {isSavedMoviesPage ? (
          <>
        <form 
          className="search__form form" 
          name="search-saved-movie-form"
          onSubmit={handleSavedMoviesFormSubmit} noValidate>
            <button
              className="search__button-left"
              type="submit"
              disabled={disabled}
            />
            <input
              className="search__input"
              type="text"
              placeholder="Фильм"
              required
              name='searchRequest'
              disabled={disabled}
              value={values.searchRequest || ''}
              onChange={handleChange}
            />
            <button
              className="search__button"
              type="submit"
              disabled={disabled}
            />
            <FilterCheckbox 
              isMovieFilter={shortMovies} 
              onFilter={onFilter} 
              disabled={disabled}
            />
        </form>
        </>
      ) : (
        <>
        <form 
          className="search__form form" 
          name="search-movie-form"
          onSubmit={handleFormSubmit} noValidate>
            <button
              className="search__button-left"
              type="submit"
              disabled={disabled}
            />
            <input
              className="search__input"
              type="text"
              placeholder="Фильм"
              required
              name='searchRequest'
              disabled={disabled}
              value={values.searchRequest || ''}
              onChange={handleChange}
            />
            <button
              className="search__button"
              type="submit"
              disabled={disabled}
            />
            <FilterCheckbox 
              isMovieFilter={shortMovies} 
              onFilter={onFilter} 
              disabled={disabled}
            />
        </form>
        </>
      )}
      <div className="search__line" />
    </section>
  )
};

export default SearchForm;
