import {
  AuthorizationState,
  AuthorizationInitialState,
} from "./authorization/state";

import { PaymentState, PaymentInitialState } from "./transaction/state";

export type State = {
  authorization: AuthorizationState,
  payment: PaymentState,
};

export const intialState = {
  authorization: AuthorizationInitialState,
  payment: PaymentInitialState,
};
