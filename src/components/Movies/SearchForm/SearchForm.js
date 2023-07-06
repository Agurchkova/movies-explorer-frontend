import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
  return (
    <section className="search">
          <form 
              className="search__form form" 
              name="search-saved-movie-form">
            <button
              className="search__button-left"
              type="submit"
            />
            <input
              className="search__input"
              type="text"
              placeholder="Фильм"
              required
              name="searchRequest"
            />
            <button
              className="search__button"
              type="submit"
            />
            <FilterCheckbox />
          </form>
      <div className="search__line" />
    </section>
  )
};

export default SearchForm;

