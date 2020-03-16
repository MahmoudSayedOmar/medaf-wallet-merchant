import { PaymentInitialState, PaymentState } from "./state";
import * as actions from "./action-creator";
import * as types from "./actions";

type Action =
  | actions.ON_PAY_Action
  | actions.PAY_SUCCESS_Action
  | actions.PAY_FAIL_Action
  | actions.RE_INTIALIZE_TRANSACTION_STATE_Action;

export function paymentReducer(
  state: PaymentState = PaymentInitialState,
  action: Action
): PaymentState {
  switch (action.type) {
    case types.ON_PAY: {
      return {
        ...state,
        memberShipId: action.payload.memberShipId,
        amount: action.payload.amount,
        pinCode: action.payload.pinCode,
        status: 0,
        loading: 1
      };
    }

    case types.PAY_SUCCESS: {
      debugger;
      return {
        ...state,
        status: 1,
        loading: 0
      };
    }

    case types.PAY_FAIL: {
      return {
        ...state,
        status: -1,
        loading: 0,
        errorMessage: action.payload
      };
    }
    case types.RE_INTIALIZE_TRANSACTION_STATE: {
      debugger;
      return PaymentInitialState;
    }
    default:
      return state;
  }
}
