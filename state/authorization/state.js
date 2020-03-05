export interface AuthorizationState {
  token: TokenDto;
  isLoggedIn: boolean;
  errorMessage: string;
  loading: boolean;
  isChange: Boolean;
  userID: String;
  brandID: String;
  groupid: String;
  amount: Number;
}

export const AuthorizationInitialState: AuthorizationState = {
  token: null,
  isLoggedIn: false,
  errorMessage: "",
  loading: false,
  isChange: false,
  userID: "",
  brandID: "",
  groupid: "",
  amount: 0
};
