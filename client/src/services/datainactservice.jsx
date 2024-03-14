import { http } from "./http.endpoint";

const dataInActService = {
  getDataInAct: async () => {
    try {
      const response = await http.get("/datainact/datainactivitys");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getDataInActFromId: async (id) => {
    try {
      const response = await http.get(`/datainact/datainactivity?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getDataInActFromDeptId: async (id) => {
    try {
      const response = await http.get(`/datainact/getdatainactivitysbyact?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  createDataInAct: async (body) => {
    try {
      const response = await http.post("/datainact/create", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  delDataInActFromId: async (id) => {
    try {
      const response = await http.del(`/datainact/delete?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default dataInActService;
