import { ChangeEvent, FormEvent, useState } from "react";
import { IContact } from "../../types";
import { validate, validateRealTime } from "../Validations";

// useForm functional component, accepts two parameters
export type IErrors = {
  name: boolean;
  company: boolean;
  email: boolean;
  phone: boolean;
};
export const useForm = (callback: any, initialState: IContact) => {
  const [data, setData] = useState(initialState);
  const [number, setNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [errors, setHasErrors] = useState<any>({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  // track touched input field
  const [touched, setTouched] = useState<any>({
    name: false,
    company: false,
    email: false,
    phone: false,
  });
  const [isValid, setIsValid] = useState<any>({
    name: false,
    company: false,
    email: false,
    phone: false,
  });

  // handle blue event
  const handleBlur = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [field]: true });
  };

  // handle input change event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //console.log(Object.values(validateRealTime(name, value)));
    setHasErrors(validateRealTime(name, value));
    setIsValid({ ...isValid, [name]: true });
    setData({ ...data, [name]: value });
  };

  // handle number input change
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHasErrors(validateRealTime(name, value));
    setIsValid({ ...isValid, [name]: true });
    setNumber(e.target.value);
    // update phone number
    setData({ ...data, phone: number });
  };

  // handle onSubmit event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // validate all form data

    setHasErrors(validate(data));

    // get error values (array), if any
    const errorValues = Object.values(validate(data));

    // submit if all error value in the array is empty
    if (!errorValues.some((error) => error)) {
      callback();
      setSubmitting(false);
      // reset  input fields
      setData(initialState);
      setNumber("");
    }
    //abort submission and return
    setSubmitting(false);
    return;
  };

  // return functions, data, errors and
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    setNumber,
    number,
    handleNumberChange,
    data,
    errors,
    submitting,
  };
};
