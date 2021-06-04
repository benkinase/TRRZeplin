import { FC } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ContactState, IContact } from "../../types";
import { RootState } from "../../redux/Reducer";
import "./Succes.css";
import { Contact } from "./Contact";

type SuccessProps = {
  setShowSuccess: (value: boolean) => void;
};

export const Success: FC<SuccessProps> = ({ setShowSuccess }) => {
  // subscribe to redux store
  const { data, loading, error }: ContactState = useSelector(
    (state: RootState) => state.contacts,
    shallowEqual
  );

  // function to index current contact from contact array
  const lastContactIn = (arr: IContact[]) => {
    return arr[arr.length - 1];
  };

  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  // current contact
  const current = lastContactIn(data);

  return (
    <div className='success__container'>
      <div className='success__content'>
        <div>
          <div className='success__upper'>
            <p>your request is submitted. thank you.</p>
            <span className='close__btn' onClick={() => setShowSuccess(false)}>
              x
            </span>
          </div>
        </div>
        <div className='contact'>
          <Contact contact={current} />
        </div>
      </div>
    </div>
  );
};
