import { AuthProxyService } from "./auth-proxy.service";
import { PayProxyService } from "./pay-proxy.service";

const authProxyService = new AuthProxyService();
const payProxyService = new PayProxyService();

export { authProxyService, payProxyService };
