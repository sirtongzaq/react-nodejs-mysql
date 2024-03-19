import { http } from "./http.endpoint";

const authService = {
  getUserFromToken: async (token) => {
    try {
      const response = await http.get(`/auth/getuserfromtoken?token=${token}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },

  getTokenFromUser: async () => {
    const token = localStorage.getItem("token");
    return token;
  },

  removeTokenFromUser: async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    return token;
  },

  userLoginWithUsernamePassword: async (body) => {
    try {
      const response = await http.post("/auth/login", body);
      const token = response.token;
      localStorage.setItem("token", token);
      // console.log("Token stored:", token);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  userRegisterWithUsernamePassword: async (body) => {
    try {
      const response = await http.post("/auth/register", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default authService;
