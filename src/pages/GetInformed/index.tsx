import { useDispatch } from "react-redux";
import { FC, useState, useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components";
import {
  addContactError,
  addContactStart,
  addContactSuccess,
} from "../../redux/Actions";
import { ContactAction, IContact } from "../../types";
import { useForm } from "../../utilities";
import { Success } from "../Success";
import { codes } from "./dial_code_data";
import "./GetInformed.css";

export const GetInformed: FC = () => {
  const codeRef = useRef<HTMLInputElement | null>(null);
  const [success, setShowSuccess] = useState<boolean>(false);

  const defaultState: IContact = {
    name: "",
    company: "",
    phone: "",
    email: "",
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setNumber,
    data,
    number,
    handleNumberChange,
    errors,
    submitting,
  } = useForm(handleCallback, defaultState);

  const dispatch: Dispatch<ContactAction> = useDispatch();

  async function handleCallback() {
    dispatch(addContactStart());

    try {
      const id = uuidv4();
      const { name, company, email, phone } = data;

      if (!name || !company || !email || !phone) {
        return;
      }
      dispatch(addContactSuccess({ id, name, company, email, phone: number }));
      setShowSuccess(true);

      // close success modal after 10s, if not manually closed
      setTimeout(() => setShowSuccess(false), 10000);
    } catch (error) {
      const message = "Something went wrong";
      dispatch(addContactError(message));
    }
  }

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((response) => {
        if (codeRef.current) {
          codeRef.current.value = response.country_calling_code;
          setNumber(response.country_calling_code);
        }
      })
      .catch(({ error, status }) => {
        console.log("Request failed:", error, status);
      });
  }, [setNumber]);

  return (
    <div className='get__informed'>
      {success && <Success setShowSuccess={setShowSuccess} />}
      <h3>contact us</h3>
      <form id='form' onSubmit={handleSubmit}>
        <div className='form__control'>
          <input
            type='text'
            placeholder='Enter company'
            name='company'
            value={data.company}
            onBlur={handleBlur("company")}
            onChange={handleChange}
            className='input__control'
          />
          {errors.company && (
            <span className='error__alert'>{errors.company}</span>
          )}
        </div>
        <div className='form__control'>
          <input
            type='text'
            placeholder='Enter name'
            name='name'
            value={data.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            className='input__control'
          />

          {errors["name"] && (
            <span className='error__alert'>{errors.name}</span>
          )}
        </div>
        <div className='form__control'>
          <input
            type='text'
            placeholder='Enter email'
            name='email'
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur("email")}
            className='input__control'
          />
          {errors["email"] && (
            <span className='error__alert'>{errors.email}</span>
          )}
        </div>

        <div className='phone__number'>
          <div className='form__control'>
            <select
              className='select_control input__control'
              onChange={(e: any) => setNumber(e.target.value)}
            >
              {codes.map((code) => (
                <option key={code.id} value={code.ISDCode}>
                  {code.country}
                </option>
              ))}
            </select>
          </div>
          <div className='form__control'>
            <input
              type='text'
              ref={codeRef}
              value={number}
              name='phone'
              onChange={handleNumberChange}
              onBlur={handleBlur("phone")}
              placeholder='Enter phone number'
              className='input__control'
            />
            {errors["phone"] && (
              <span className='error__alert'>{errors.phone}</span>
            )}
          </div>
        </div>
        <div className='button__container'>
          <Button variant='primary'>
            {submitting ? "submitting..." : "get informed"}
          </Button>
        </div>
      </form>
    </div>
  );
};
