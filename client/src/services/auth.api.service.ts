import axios from "axios";
import { User } from "../model/user.model";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createAuthApiService = {
  login: async ({ email, password }: User) => {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  register: async ({ email, password, firstname }: User) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        email,
        password,
        firstname,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
