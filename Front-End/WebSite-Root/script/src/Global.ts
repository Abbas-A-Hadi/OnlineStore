import {User} from "./DataTypes/Users/User.js";
import {ApiClient} from "./ApiClient.js";

// My base server address for APIs.
const baseApiUrl: string = 'https://localhost:7044/api/';
const api: ApiClient = new ApiClient(baseApiUrl);
let userObject: User = User.Empty();



export {baseApiUrl, api, userObject};