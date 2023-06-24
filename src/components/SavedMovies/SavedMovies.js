import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import "./SavedMovies.css";


function SavedMovies ({ isLoggedIn , isLoading, cards, onDelete }) {
    return (
    <section className="saved-movies__page">
      <Header isLoggedIn={isLoggedIn}  />
      <div className="saved-movies__content">
        <SearchForm
        />
        {isLoading && (
          <Preloader />
        )}
        {!isLoading && (
          <MoviesCardList
            cards={cards}
            onDelete={onDelete}
            isSavedMoviesPage={true}
          />
        )}
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;