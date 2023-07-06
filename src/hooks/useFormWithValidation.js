import { useState, useCallback } from "react";

export default function useFormWithValidation () {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values, [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsValid(event.target.closest(".form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsFormValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values, errors, handleChange, isValid, resetForm
  };
};