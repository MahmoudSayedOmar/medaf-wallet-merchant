import * as types from "./actions";
import { authProxyService } from "../../services";

export type ON_LOGIN_Action = { type: string, payload: any };
export type LOGIN_SUCCESS_Action = {
  type: string,
  payload: any,
};
export type LOGIN_FAIL_Action = { type: string, payload: string };

export function tryLogin(user) {
  return async (dispatch) => {
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
///////////////////////////////////////////

export type LOGOUT_Action = { type: string };

export function loggingout() {
  return async (dispatch) => {
    dispatch(logout());
  };
}

export function logout(): LOGOUT_Action {
  return { type: types.LOGOUT };
}
/////////////////////////////////////////////
export type ON_FIRST_LOGIN_Action = { type: string };
export type FIRST_LOGIN_SUCCESS_Action = {
  type: string,
};
export type FIRST_LOGIN_FAIL_Action = { type: string, payload: string };

export function tryFirstLogin(data) {
  return async (dispatch, getState) => {
    dispatch(onFirstLogin());
    if (data.newPassword != data.retypePassword) {
      dispatch(
        onFirstLoginFail("make sure New Password and Retyped ones is the same")
      );
    } else {
      data.userName = getState().authorization.userName;
      let response = await authProxyService.setFirstPassword(data);
      result = await response.data;
      debugger;

      if (response.status === 200) {
        debugger;

        if (result.Code == "1") {
          dispatch(onFirstLoginSuccess({}));
        } else {
          dispatch(onFirstLoginFail(response.data.Message));
        }
      } else {
        console.log("nekaa", response);
        debugger;

        dispatch(onFirstLoginFail(response.data));
      }
    }
  };
}

export function onFirstLogin(): ON_FIRST_LOGIN_Action {
  return { type: types.ON_FIRST_LOGIN };
}

export function onFirstLoginSuccess(): FIRST_LOGIN_SUCCESS_Action {
  return { type: types.FIRST_LOGIN_SUCCESS };
}

export function onFirstLoginFail(errorMsg): FIRST_LOGIN_FAIL_Action {
  return { type: types.FIRST_LOGIN_FAIL, payload: errorMsg };
}
