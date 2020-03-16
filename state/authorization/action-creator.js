import * as types from "./actions";
import { authProxyService } from "../../services";

export type ON_LOGIN_Action = { type: string, payload: any };
export type LOGIN_SUCCESS_Action = {
  type: string,
  payload: any
};
export type LOGIN_FAIL_Action = { type: string, payload: string };

export function tryLogin(user) {
  return async dispatch => {
    dispatch(onLogin(user));
    debugger;

    let response = await authProxyService.login(user);
    debugger;

    const result = await response.data;
    if (response.status === 200) {
      debugger;
      dispatch(success(result));
    } else {
      dispatch(fail());
    }
  };
}

export function onLogin(user): ON_LOGIN_Action {
  return { type: types.ON_LOGIN, payload: user };
}

export function success(token: TokenDto): LOGIN_SUCCESS_Action {
  return { type: types.LOGIN_SUCCESS, payload: token };
}

export function fail(): LOGIN_FAIL_Action {
  const errorMsg = "Invalid Credentials";
  return { type: types.LOGIN_FAIL, payload: errorMsg };
}
