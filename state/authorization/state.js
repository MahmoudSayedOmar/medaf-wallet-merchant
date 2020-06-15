export interface AuthorizationState {
  token: TokenDto;
  isLoggedIn: boolean;
  errorMessage: string;
  loading: false;
  isChange: Boolean;
  userID: String;
  brandID: String;
  groupid: String;
  amount: Number;
  loginFail: Boolean;
  firstLogIn: Boolean;
  haveSetFirstPassword: Boolean;
  firstLoginErrorMessage: String;
  selectedMerchant: Number;
  url: String;
  selectedMerchantName: String;
  memberShipId: String;
  merchants: Array;
  haveSelectMerchant: Boolean;
}

export const AuthorizationInitialState: AuthorizationState = {
  token: null,
  isLoggedIn: false,
  errorMessage: "",
  loading: null,
  isChange: false,
  userID: "",
  brandID: "",
  groupid: "",
  amount: 0,
  loginFail: false,
  firstLogIn: true,
  haveSetFirstPassword: false,
  firstLoginErrorMessage: "",
  selectedMerchant: null,
  merchants: [],
  url: "",
  selectedMerchantName: "",
  memberShipId: "",
  haveSelectMerchant: false,
};
