import { User } from "./DataTypes/Users/User.js";
import { ApiClient } from "./ApiClient.js";
const baseApiUrl = 'https://localhost:7044/api/';
const api = new ApiClient(baseApiUrl);
let userObject = User.Empty();
export { baseApiUrl, api, userObject };
//# sourceMappingURL=Global.js.map