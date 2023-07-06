import "./FilterCheckbox.css";

function FilterCheckbox ({ isMovieFilter, onFilter }) {
  return (
    <section className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        name="checkbox"
        onChange={onFilter}
        checked={isMovieFilter}
      />
      <label
        className="filter__label"
        htmlFor="checkbox">
        Короткометражки
      </label>
    </section>
  )
};

export default FilterCheckbox;