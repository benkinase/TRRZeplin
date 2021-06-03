import { combineReducers } from "redux";
import { ContactState, ContactAction, ActionTypes } from "../../types";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const contactReducer = (
  state: ContactState = initialState,
  action: ContactAction
): ContactState => {
  switch (action.type) {
    case ActionTypes.ADD_CONTACT_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case ActionTypes.ADD_CONTACT_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  contacts: contactReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
