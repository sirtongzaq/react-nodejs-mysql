import { http } from "./http.endpoint";

const depService = {
  getDep: async () => {
    try {
      const response = await http.get("/dep/departments");
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },

  delDepFromId: async (id) => {
    try {
      const response = await http.del(`/dep/delete?id=${id}`);
      return response;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  },
};

export default depService;
