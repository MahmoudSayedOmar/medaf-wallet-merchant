import { combineReducers } from "redux";

import { authorizationReducer } from "./authorization/reducer";

import { paymentReducer } from "./transaction/reducer";

import { intialState } from "./state";
const appReducer = combineReducers({
  authorization: authorizationReducer,
  payment: paymentReducer,
});

export const reducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = intialState;
  }

  return appReducer(state, action);
};
