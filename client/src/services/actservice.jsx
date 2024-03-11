import { http } from "./http.endpoint";

const actService = {
  getAct: async () => {
    try {
      const response = await http.get("/dep/activitys");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getActFromId: async (id) => {
    try {
      const response = await http.get(`/act/getbyid?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getActFromDeptId: async (id) => {
    try {
      const response = await http.get(`/act/getbydeptid?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  createAct: async (body) => {
    try {
      const response = await http.post("/act/create", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default actService;
