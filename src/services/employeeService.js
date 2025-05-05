import httpClient from "./httpClient";

class EmployeeService{
  static async getEmployee(){
    try {
      const response = await httpClient.get("/Employee", {  });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getEmployeesPaginated(pageNumber, pageSize){
      try{
        const response = await httpClient.get(`/Employee/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
      }catch (error){
        throw error;
      }
  }

  static async addEmployee(data){
    try{
      const response = await httpClient.post("/Employee",data);
      console.log(response);
    }catch (error){
        throw error;
    }
  }

  static async getEmployeeById(id){
    try{
      const response = await httpClient.get(`/Employee/${id}`);
      return response.data;
  
    }catch(error){
      throw error;
    }
  }

  static async updateEmployee(data,id){
    try{
      const response = await httpClient.put(`/Employee/${id}`,data);
      return response.data;
    }catch (error){
      throw error;
    }
  }
}

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

export default EmployeeService;

