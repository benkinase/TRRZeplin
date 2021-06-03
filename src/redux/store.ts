import { createStore, compose, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { ContactAction, DispatchType } from "../types";
import { rootReducer, RootState } from "./Reducer";

// middleware array
const middlewares = [thunk];

// redux devtool typing
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store with rootReducer,RootState,DispatchType and middleware/s
export const store: Store<RootState, ContactAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
