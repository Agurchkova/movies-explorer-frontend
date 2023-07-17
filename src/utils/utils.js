export function findShortMovies(movies) {
  return movies.filter((movie) => movie.duration < 40)
}

export function findMovies(movies, value, isShortMovies = false) {
  return movies
    .filter((movie) => {
      if (isShortMovies) {
        return movie.duration < 40
      }
      return true
    })
    .filter((movie) => {
      const name = String(`${movie.nameRU}\n${movie.nameEN}`).toLowerCase().trim()
      value = String(value).toLowerCase().trim()
      return name.indexOf(value) !== -1
    })
}

export const checkAddedCard = (moviesList, movie) => {
  return moviesList.find((card) => {
    return card.movieId === (movie.id || movie.movieId)
  })
}
