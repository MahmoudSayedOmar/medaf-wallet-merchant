import { BASE_URL } from "../http-client/constants";

import axios from "axios";

export class PayProxyService {
  async pay(data, token) {
    return await axios({
      method: "post",
      url: `${BASE_URL}customer/PaymentProcessing`,
      data: data,
      headers: { token },
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
