import "./FilterCheckbox.css";

function FilterCheckbox () {
  return (
    <section className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        id="checkbox"
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