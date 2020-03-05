export interface PaymentState {
  memberShipId: String;
  amount: String;
  pinCode: String;
  status: Boolean;
}

export const PaymentInitialState: PaymentState = {
  memberShipId: "",
  amount: "",
  pinCode: "",
  status: 0
};
