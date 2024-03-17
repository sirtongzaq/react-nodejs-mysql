import { http } from "./http.endpoint";

const actService = {
  getAct: async () => {
    try {
      const response = await http.get("/act/activitys");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getActFromId: async (id) => {
    try {
      const response = await http.get(`/act/activity?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getActFromDeptId: async (id) => {
    try {
      const response = await http.get(`/act/getactivitybydept?id=${id}`);
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
  delActFromId: async (id) => {
    try {
      const response = await http.del(`/act/delete?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  updateAct: async (body) => {
    try {
      const response = await http.put("/act/activity", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default actService;
