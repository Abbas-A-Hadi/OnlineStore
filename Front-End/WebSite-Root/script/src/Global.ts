import {User} from "./DataTypes/Users/User.js";
import {ApiClient} from "./ApiClient.js";

// My base server address for APIs.
const baseApiUrl: string = 'https://localhost:7044/api/';
const Api: ApiClient = new ApiClient(baseApiUrl);
let CurrentUserObject: User = User.Empty();



export {baseApiUrl, Api, CurrentUserObject};