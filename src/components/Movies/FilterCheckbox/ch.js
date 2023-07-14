import "./FilterCheckbox.css";

function FilterCheckbox ({ isFiltered, onFilter }) {
  return (
    <section className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="checkbox"
        onChange={onFilter}
        checked={isFiltered}
      />
      <label
        className="filter-checkbox__label"
        htmlFor="checkbox">
        Короткометражки
      </label>
    </section>
  )
};

export default FilterCheckbox;