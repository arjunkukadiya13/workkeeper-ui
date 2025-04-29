import httpClient from "./httpClient";



const addEmployeeService = {
  addEmployee:async (data) =>{
    try{
      const response = await httpClient.post("/Employee",data);
      console.log(response);
    }catch (error){
        throw error;
    }
  },
  getEmployee: async () => {
    try {
      const response = await httpClient.get("/Employee", {  });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getDepartment: async () => {
    try{
        const response = await httpClient.get("/Department",{});
        return response.data;
    }catch(error){
        throw error;
    }
  },
  getRole: async () => {
        try{
            const response = await httpClient.get("/Role",{});
            return response.data;
        }catch (error){
            throw error;
          }
  },
  getOffice: async () => {
    try{
        const response = await httpClient.get("/Office",{});
        return response.data;
    }catch(error){
        throw error;
    }
  },
  getTeams: async () => {
    try{
        const response = await httpClient.get("/Team",{});
       return response.data
    }catch(error){
        throw error;
    }
  }
};

export default addEmployeeService;

