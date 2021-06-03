import { IContact, ContactAction, ActionTypes } from "../../types";

// add contact action creator
export const addContactStart = (): ContactAction => ({
  type: ActionTypes.ADD_CONTACT_REQUEST,
  payload: null,
});
export const addContactSuccess = (contact: IContact): ContactAction => ({
  type: ActionTypes.ADD_CONTACT_SUCCESS,
  payload: contact,
});
export const addContactError = (error: string): ContactAction => ({
  type: ActionTypes.ADD_CONTACT_ERROR,
  payload: error,
});
