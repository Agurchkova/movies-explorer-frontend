import "./MoviesCard.css";
import { useState, useEffect } from 'react';
import useScreenWidth from '../../../hooks/useScreenWidth';

function MoviesCard ({  
  isSavedMoviesPage,
  movie,
  onSave,
  onDelete,
  saved }) {

   // изменения формата времени
   function handleDurationFormat(mins) {
      return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
   }

   const screenWidth = useScreenWidth();
   const [isMobile, setIsMobile] = useState(false);
   const handleSaveCard = () => {
     onSave(movie);
   };
 
   const handleDeleteCard = () => {
     onDelete(movie);
   };
 
   useEffect(() => {
     if (screenWidth < 786) {
       setIsMobile(true);
     } else {
       setIsMobile(false);
     }
   }, [screenWidth]);

  return (
    <li className="card">
      <a className="card__image-container" 
         target="_blank" 
         href={movie.trailerLink} 
         rel="noreferrer">
        <img
          className="card__image"
          src={isSavedMoviesPage ?
            movie.image :
            `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={`Постер фильма: ${movie.nameRU}`}
        />
      </a>
      <div className="card__description">
        <span className="card__name">{movie.nameRU}</span>
        {saved && !isSavedMoviesPage &&
          <button
            className="card__button card__button_active"
            onClick={handleSaveCard}
            type="button"
            aria-label="Добавить в сохранённые фильмы"
          />}
        {isSavedMoviesPage ? (
          <button
            className="card__button_delete"
            type="button"
            aria-label="Удалить фильм из сохранённых"
            onClick={handleDeleteCard}
          />
          ) : (
          <button
            className={!saved ? 'card__button' : 'card__button_hidden'}
            type='button'
            onClick={handleSaveCard}
          />
        )}
        {isMobile && !isSavedMoviesPage && !saved && (
          <button
            className='card__button card__button_active'
            type='button'
            onClick={handleSaveCard}
          />
        )}   
      </div>
      <p className="card__duration">
        {handleDurationFormat(movie.duration)}
      </p>
    </li>
  )
};

export default MoviesCard;