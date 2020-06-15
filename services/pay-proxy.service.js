import { BASE_URL } from "../http-client/constants";

import axios from "axios";

export class PayProxyService {
  async pay(data, token, connectionId) {
    debugger;
    return await axios({
      method: "post",
      url: `${BASE_URL}customer/PaymentProcessing?connectionId=${connectionId}`,
      data: data,
      headers: { token },
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
}
