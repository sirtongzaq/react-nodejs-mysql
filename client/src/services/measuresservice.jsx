import { http } from "./http.endpoint";

const MeasuresService = {
  getMeasures: async () => {
    try {
      const response = await http.get("/meas/measures");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getMeasuresFromId: async (id) => {
    try {
      const response = await http.get(`/meas/measure?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  getMeasuresFromActId: async (id) => {
    try {
      const response = await http.get(`/meas/getmeasuresbyact?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  createMeasures: async (body) => {
    try {
      const response = await http.post("/meas/create", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  delMeasuresFromId: async (id) => {
    try {
      const response = await http.del(`/meas/delete?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
  updateMeasures: async (body) => {
    try {
      const response = await http.put("/meas/measure", body);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default MeasuresService;
