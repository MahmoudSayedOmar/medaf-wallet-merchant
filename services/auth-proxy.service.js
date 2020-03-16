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
          "content-Type": "application/json"
        }
      }
    }).catch(function(err) {
      return err;
    });
  }
}
