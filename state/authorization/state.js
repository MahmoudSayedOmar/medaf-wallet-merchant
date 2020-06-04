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
};
