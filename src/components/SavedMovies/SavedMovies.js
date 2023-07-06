import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import "./SavedMovies.css";


function SavedMovies ({ isLoggedIn, isLoading, cards, onDelete }) {
    return (
      <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="saved-movies">
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
      </section>
      <Footer />
      </>
    
  )
};

export default SavedMovies;