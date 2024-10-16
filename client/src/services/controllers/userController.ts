import { ISignedTerm, IUserData } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class UserController {
  async update(_id: string, password: string, data: IUserData) {
    try {
      const response = await request(
        RequestMethods.PATCH,
        `/user/updateUser/${_id}`,
        { data, password }
      );

      return response.data;
    } catch (e) {
      return e;
    }
  }

  async updatePassword(_id: string, password: string, newPassword: string) {
    try {
      const response = await request(
        RequestMethods.POST,
        `/user/updatePassword/${_id}`,
        {
          password,
          newPassword,
        }
      );

      return response.data;
    } catch (e) {
      return e;
    }
  }

  async hasSignedCurrentTerm(_id: string) {
    try {
      const response = await request(
        RequestMethods.GET,
        `/user/hasSignedCurrentTerm/${_id}`
      );

      if (response.data !== null) return response.data;

      return false;
    } catch (e: any) {
      if (e.response && e.response.data) return e.response.data;
      return e;
    }
  }

  async signCurrentTerm(_id: string, data: ISignedTerm) {
    try {
      const response = await request(
        RequestMethods.POST,
        `/user/signCurrentTerm/${_id}`,
        { signedTerm: data }
      );

      return response.data;
    } catch (e: any) {
      if (e.response && e.response.data) return e.response.data;
      return e;
    }
  }

  async updateTermSign(_id: string, data: ISignedTerm) {
    try {
      const response = await request(
        RequestMethods.POST,
        `/user/updateTermSign/${_id}`,
        { signedTerm: data }
      );

      return response.data;
    } catch (e: any) {
      if (e.response && e.response.data) return e.response.data;
      return e;
    }
  }

  async getCurrentTermSignature(_id: string) {
    try {
      const response = await request(
        RequestMethods.GET,
        `/user/getCurrentTermSignature/${_id}`
      );

      return response.data;
    } catch (e: any) {
      return null;
    }
  }

  async deleteUser(_id: string) {
    try {
      const response = await request(
        RequestMethods.DELETE,
        `/user/deleteUser/${_id}`
      );

      return response.data;
    } catch (e: any) {
      return null;
    }
  }
}

const userController = new UserController();
export default userController;
