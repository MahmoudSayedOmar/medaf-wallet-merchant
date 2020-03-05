import * as types from "./actions";
import { payProxyService } from "../../services";

export type ON_PAY_Action = { type: string, payload: any };
export type PAY_SUCCESS_Action = {
  type: string,
  payload: any
};
export type PAY_FAIL_Action = { type: string, payload: string };

export function tryPay(data) {
  return async (dispatch, getState) => {
    dispatch(onPay(data));
    const state = getState();
    let trans = {
      CustomerCardNo: data.memberShipId,
      DealerId: state.authorization.userID,
      Amount: data.amount,
      PIN: data.pinCode
    };
    let { token } = state.authorization;
    debugger;
    let response = await payProxyService.pay(trans, token);
    if (response.status === 200) {
      debugger;
      dispatch(paySuccess());
    } else {
      dispatch(payFail());
    }
  };
}

export function onPay(user): ON_PAY_Action {
  return { type: types.ON_PAY, payload: user };
}

export function paySuccess(): PAY_SUCCESS_Action {
  return { type: types.PAY_SUCCESS };
}

export function payFail(): PAY_FAIL_Action {
  const errorMsg = "Invalid Credentials";
  return { type: types.PAY_FAIL, payload: errorMsg };
}
