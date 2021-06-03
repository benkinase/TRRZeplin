export interface IContact {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone?: number | string;
}

export interface ContactState {
  data: IContact[];
  loading: boolean;
  error: string;
}

export enum ActionTypes {
  ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST",
  ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS",
  ADD_CONTACT_ERROR = "ADD_CONTACT_ERROR",
}

export type ContactAction =
  | { type: ActionTypes.ADD_CONTACT_REQUEST; payload: null }
  | { type: ActionTypes.ADD_CONTACT_SUCCESS; payload: IContact }
  | { type: ActionTypes.ADD_CONTACT_ERROR; payload: string };

export type DispatchType = (args: ContactAction) => ContactAction;
