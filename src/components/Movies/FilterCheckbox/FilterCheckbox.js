import "./FilterCheckbox.css";

function FilterCheckbox ({ isFilter, onFilter }) {

  return (
    <section className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="checkbox"
        onChange={onFilter}
        checked={isFilter}
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