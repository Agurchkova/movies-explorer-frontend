import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard ({ card, isLiked, onCardLike }) {

   const location = useLocation();

   // изменения формата времени
   function handleDurationFormat(mins) {
      return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
   }

  return (
    <li className="card">
      <a className="card__image-container" 
         target="_blank" 
         href={card.trailerLink} 
         rel="noreferrer">
        <img
          className="card__image"
          src={`https://api.nomoreparties.co${card.image.url}`} // временное решение
          alt={`Постер фильма: ${card.nameRU}`}
        />
      </a>
      <div className="card__description">
        <span className="card__name">{card.nameRU}</span>
        {location.pathname === "/movies" ? (
          <button
            className={`card__button ${
              isLiked ? "card__button_active" : ""
            }`}
            type="button"
            aria-label="Добавить в сохранённые фильмы"
            onClick={onCardLike}
          >
          </button>
        ) : (
          <button
            className="card__button_delete"
            type="button"
            aria-label="Удалить фильм из сохранённых"
          >
          </button>
        )}
      </div>
      <p className="card__duration">
        {handleDurationFormat(card.duration)}
      </p>
    </li>
  )
};

export default MoviesCard;