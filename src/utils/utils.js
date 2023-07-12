export function findShortMovies(movies) {

  return movies.filter(movie => movie.duration < 40);
}

export function findMovies(movies, userSearch, shortMoviesCheckbox) {

  const moviesByUserSearch = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userSearch?.toLowerCase().trim();

    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return findShortMovies(moviesByUserSearch);
  } else {
    return moviesByUserSearch;
  }
}

export const checkAddedCard = (moviesList, movie) => {
  return moviesList.find((card) => {
    return card.movieId === (movie.id || movie.movieId);
  });
}