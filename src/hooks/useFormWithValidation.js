import { useState, useCallback } from "react";
import isEmail from 'validator/es/lib/isEmail';
import { WRONG_EMAIL_MSG } from '../utils/constants';

export default function useFormWithValidation () {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      if (!isEmail(value)) {
        event.target.setCustomValidity(WRONG_EMAIL_MSG);
      } else {
        event.target.setCustomValidity('');
      }
    }

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
    values, setValues, errors, handleChange, isValid, setIsValid, resetForm
  };
};