import { User } from "./DataTypes/Users/User.js";
import { ApiClient } from "./ApiClient.js";
const baseApiUrl = 'https://localhost:7044/api/';
const Api = new ApiClient(baseApiUrl);
let CurrentUserObject = User.Empty();
export { baseApiUrl, Api, CurrentUserObject };
//# sourceMappingURL=Global.js.map