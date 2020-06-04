import { BASE_URL } from "../http-client/constants";

import axios from "axios";

export class AuthProxyService {
  async login(user) {
    let data = {};
    data["UserName"] = user.userName;
    data["Password"] = user.password;

    return await axios({
      method: "post",
      url: `${BASE_URL}User/Authenticate`,
      data: data,
      config: {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-Type": "application/json",
        },
      },
    }).catch(function (err) {
      return err;
    });
  }
  async setFirstPassword(setFirstPasswordData) {
    let data = {};
    data["UserName"] = setFirstPasswordData.userName;
    data["OldPassword"] = setFirstPasswordData.oldPassword;
    data["Password"] = setFirstPasswordData.newPassword;
    data["ConfirmPassword"] = setFirstPasswordData.newPassword;

    let URL = `${BASE_URL}User/ChangePassword`;
    return await axios({
      method: "post",
      url: URL,
      data: data,
      config: {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-Type": "application/json",
        },
      },
    }).catch(function (err) {
      debugger;
      return err.response;
    });
  }
}
