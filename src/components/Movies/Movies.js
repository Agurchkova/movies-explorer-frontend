import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies ({ isLoggedIn, isLoading, cards, isLiked, onCardLike }) {
  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="movies__page">
      <div className="movies__content">
      <SearchForm />
      {isLoading && (
        <Preloader />
        )}
      {!isLoading && 
        <MoviesCardList 
          cards={cards} 
          isLiked={isLiked} 
          onCardLike={onCardLike}
      />
      }
      </div>
    </section>
    <Footer />
    </>
  )
};

export default Movies;
