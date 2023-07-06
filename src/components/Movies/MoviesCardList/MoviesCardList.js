import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList ({ cards, isLiked, onCardLike, isSavedMoviesPage }) {
  return (
    <section
      className="cards"
      aria-label="Секция с карточками фильмов"
    >
      {cards.length === 0 ? (
        <p className="cards__list__not-found">
          Извините, но&nbsp;запрошенный поиск не&nbsp;дал результатов. 
          Расширьте критерии поиска и&nbsp;попробуйте снова
        </p>
      ) : (
        <>
          <ul
            className={`cards__list ${
              cards.length > 3 ? "cards__list_space-evenly" : ""
            }`}
          >
            {cards.map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isLiked={isLiked}
                onCardLike={onCardLike}
                isSavedMoviesPage={isSavedMoviesPage}
              />
            ))}
          </ul>
          {!isSavedMoviesPage && (
        <button
          className="cards__button-more"
        >
          Ещё
        </button>
      )}
        </>
      )}
    </section>
  )
};

export default MoviesCardList;
