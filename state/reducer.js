import { combineReducers } from "redux";

import { authorizationReducer } from "./authorization/reducer";

import { paymentReducer } from "./transaction/reducer";

const appReducer = combineReducers({
  authorization: authorizationReducer,
  payment: paymentReducer
});

export const reducer = (state, action) => {
  return appReducer(state, action);
};
