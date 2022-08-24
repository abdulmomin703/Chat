import { HTTP_Request } from "../util/interceptors";
import { Endpoint } from "../util/endpoints";

const LoginApi = async (username) => {
  return await HTTP_Request.post(Endpoint.LoginApi, { username: username });
};

const GetUsersApi = async () => {
  return await HTTP_Request.get(Endpoint.getUsersApi);
};

export { LoginApi, GetUsersApi };
