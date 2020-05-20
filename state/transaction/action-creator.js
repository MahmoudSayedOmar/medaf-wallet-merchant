import * as types from "./actions";
import { payProxyService } from "../../services";
import { connect } from "react-redux";

export type ON_PAY_Action = { type: string, payload: any };
export type PAY_SUCCESS_Action = {
  type: string,
  payload: any,
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
      RefNumber: data.refNumber,
      PIN: data.pinCode,
    };
    let { token } = state.authorization;
    let response = await payProxyService.pay(trans, token, data.connectionId);
    debugger;

    if (response.status === 200) {
      debugger;
      if (response.data.code == 1) {
        dispatch(paySuccess());
      } else {
        dispatch(payFail(response.data.Message));
      }
    } else {
      dispatch(payFail("wrong pin number"));
    }
  };
}

export function onPay(user): ON_PAY_Action {
  return { type: types.ON_PAY, payload: user };
}

export function paySuccess(): PAY_SUCCESS_Action {
  return { type: types.PAY_SUCCESS };
}

export function payFail(errorMsg): PAY_FAIL_Action {
  //const errorMsg = "Invalid Credentials";
  debugger;
  return { type: types.PAY_FAIL, payload: errorMsg };
}
///////////////////////////////////////////////////////////////////

export type RE_INTIALIZE_TRANSACTION_STATE_Action = { type: string };

export function rePay() {
  return async (dispatch) => {
    dispatch(reIntializeTransactionState());
  };
}

export function reIntializeTransactionState(): RE_INTIALIZE_TRANSACTION_STATE_Action {
  return { type: types.RE_INTIALIZE_TRANSACTION_STATE };
}
