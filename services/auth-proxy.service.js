import { BASE_URL } from "../http-client/constants";

import axios from "axios";

export class AuthProxyService {
  async login(user) {
    let data = {};
    data["UserName"] = user.userName;
    data["Password"] = user.password;

    return await axios({
      method: "post",
      url: `${BASE_URL}User/MerchantAuthenticate`,
      data: data,
      config: {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-Type": "application/json",
        },
      },
    }).catch(function (err) {
      return err.response;
    });
  }
  async setFirstPassword(setFirstPasswordData) {
    let data = {};
    data["UserName"] = setFirstPasswordData.userName;
    data["OldPassword"] = setFirstPasswordData.oldPassword;
    data["Password"] = setFirstPasswordData.newPassword;
    data["ConfirmPassword"] = setFirstPasswordData.newPassword;

    let URL = `${BASE_URL}User/MerchantChangePassword`;
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

  async setSelectedMerchant(customerId, token) {
    debugger;
    let URL = `${BASE_URL}User/SelectMerchant?customerId=${customerId}`;
    return await axios({
      method: "post",
      url: URL,
      headers: { token },
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
