import "./Form.css";

function Form({
  name,
  onSubmit,
  isFormValid,
  isCurrentUser,
  buttonText,
  isEditingBegun,
  ...props
}) {
  // handleButtonDisable
  function handleButtonDisable() {
    if (name === "profile___form") {
      return isFormValid && !isCurrentUser ? false : true;
    } else {
      return isFormValid ? false : true;
    }
  }

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <button
        type="submit"
        form={`${name}`}
        className={`form__btn-submit profile__edit-button_save ${
          name === "profile___form" && !isEditingBegun
            ? "form__btn-submit_hidden"
            : ""
        } hover-button`}
        disabled={handleButtonDisable()}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;