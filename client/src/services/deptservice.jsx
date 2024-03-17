import { http } from "./http.endpoint";

const depService = {
  getDep: async () => {
    try {
      const response = await http.get("/dept/departments");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getDepFromId: async (id) => {
    try {
      const response = await http.get(`/dept/getdept?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  delDepFromId: async (id) => {
    try {
      const response = await http.del(`/dept/delete?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  createDep: async (body) => {
    try {
      const response = await http.post("/dept/create", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  updateDep: async (body) => {
    try {
      const response = await http.put("/dept/department", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default depService;
