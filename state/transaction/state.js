export interface PaymentState {
  memberShipId: String;
  amount: String;
  pinCode: String;
  status: Number;
  loading: Boolean;
  errorMessage: String;
}

export const PaymentInitialState: PaymentState = {
  memberShipId: "",
  amount: "",
  pinCode: "",
  status: 0,
  loading: 0,
  errorMessage: ""
};
