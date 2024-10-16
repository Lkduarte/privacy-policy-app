import { RequestMethods, request } from "../api";

class AuthControler {
  async login(email: string, password: string) {
    return await request(RequestMethods.POST, "/auth/login", {
      email,
      password,
    });
  }

  async register(data: any) {
    try {
      const response = await request(
        RequestMethods.POST,
        "/user/register",
        data
      );

      return response.data;
    } catch (e) {
      return e;
    }
  }
}

const authController = new AuthControler();
export default authController;
