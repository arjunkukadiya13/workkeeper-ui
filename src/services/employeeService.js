import httpClient from "./httpClient";



const employeeService = {
  getEmployee: async () => {
    try {
      const response = await httpClient.get("/Employee", {  });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEmployeeById: async (id)=> {
    try{
    const response = await httpClient.get(`/Employee/${id}`);
    // console.log(response.data.name);
    return response.data;

  }catch(error){
    throw error;
  }
},
  updateEmployee: async (data,id) => {
    try{
      const response = await httpClient.put(`/Employee/${id}`,data);
      return response.data;
    }catch (error){
      throw error;
    }
  }
};

export default employeeService;

