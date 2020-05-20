import { AuthorizationState, AuthorizationInitialState } from "./state";
import * as actions from "./action-creator";
import * as types from "./actions";

type Action =
  | actions.ON_LOGIN_Action
  | actions.LOGIN_SUCCESS_Action
  | actions.LOGIN_FAIL_Action;

export function authorizationReducer(
  state: AuthorizationState = AuthorizationInitialState,
  action: Action
): AuthorizationState {
  switch (action.type) {
    case types.ON_LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.LOGIN_SUCCESS: {
      debugger;
      return {
        ...state,
        token: action.payload.Token,
        isLoggedIn: true,
        loading: false,
        userID: action.payload.LoginId,
        brandID: action.payload.BrandId,
        groupID: action.payload.GroupId,
        amount: 0,
        loginFail: false,
      };
    }

    case types.LOGIN_FAIL: {
      debugger;
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.payload,
        loading: false,
        loginFail: true,
      };
    }

    default:
      return state;
  }
}
