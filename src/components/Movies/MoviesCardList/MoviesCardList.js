import { useEffect, useState } from "react";
import useScreenWidthController from "../../../hooks/useScreenWidthController";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { checkAddedCard } from "../../../utils/utils";

import {
  QUANTITY_MOVIES_DESKTOP,
  QUANTITY_MOVIES_MIDDLE_SCREEN,
  QUANTITY_MOVIES_MOBILE_SCREEN,
  MORE_QUANTITY_MOVIES_DESKTOP,
  MORE_QUANTITY_MOVIES_MOBILE_SCREEN,
  WIDTH_DESKTOP_SCREEN,
  WIDTH_MOBILE_SCREEN,
} from "../../../utils/constants";

function MoviesCardList({
  movies,
  addedMovies,
  isAdded,
  onDelete,
  isSavedMoviesPage,
}) {
  const screenWidth = useScreenWidthController();
  const [showMovieList, setShowMovieList] = useState(movies);
  const searchedMoviesCount = movies ? movies.length : 0;

  const handleMoreClick = () => {
    if (screenWidth > WIDTH_DESKTOP_SCREEN) {
      setShowMovieList(
        movies.slice(0, showMovieList.length + MORE_QUANTITY_MOVIES_DESKTOP)
      );
    } else {
      setShowMovieList(
        movies.slice(
          0,
          showMovieList.length + MORE_QUANTITY_MOVIES_MOBILE_SCREEN
        )
      );
    }
  };

  useEffect(() => {
    if (screenWidth > WIDTH_DESKTOP_SCREEN) {
      setShowMovieList(movies.slice(0, QUANTITY_MOVIES_DESKTOP));
    } else if (
      screenWidth > WIDTH_MOBILE_SCREEN &&
      screenWidth <= WIDTH_DESKTOP_SCREEN
    ) {
      setShowMovieList(movies.slice(0, QUANTITY_MOVIES_MIDDLE_SCREEN));
    } else if (screenWidth <= WIDTH_MOBILE_SCREEN) {
      setShowMovieList(movies.slice(0, QUANTITY_MOVIES_MOBILE_SCREEN));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, movies]);

  return (
    <section className="cards" aria-label="Секция с карточками фильмов">
      <ul className="cards__list">
        {showMovieList.sort().map((movie) => {
          return (
            <MoviesCard
              key={isSavedMoviesPage ? movie.movieId : movie.id}
              movie={movie}
              isSavedMoviesPage={isSavedMoviesPage}
              isAdded={isAdded}
              onDelete={onDelete}
              saved={checkAddedCard(addedMovies, movie)}
            />
          );
        })}
      </ul>
      {!isSavedMoviesPage &&
        showMovieList &&
        searchedMoviesCount !== showMovieList.length && (
          <button className="cards__button-more" onClick={handleMoreClick}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
