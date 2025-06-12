import httpClient from "./httpClient";

class EmployeeService {
  static async getEmployee() {
    try {
      const response = await httpClient.get("/Employee", {});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getEmployeesPaginated(pageNumber, pageSize) {
    try {
      const response = await httpClient.get(`/Employee/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getFilteredEmployee(pageNumber, pageSize, deptName, role, name) {
    try {
      const response = await httpClient.get(`/Employee/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&deptName=${deptName}&role=${role}&name=${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addEmployee(data) {
    try {
      const response = await httpClient.post("/Employee", data);
    } catch (error) {
      throw error;
    }
  }

  static async getEmployeeById(id) {
    try {
      const response = await httpClient.get(`/Employee/${id}`);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
  static async getEmployeeByEmail(email) {
    try {
      const response = await httpClient.get("/Employee/by-email", {
        params: { email }
      });
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  static async updateEmployee(data, id) {
    try {
      const response = await httpClient.put(`/Employee/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getEmployeeByRole(role) {
    try {
      const response = await httpClient.get(`/Employee/by-role`, {
        params: { roleName: role }
      });
      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async getEmployeeByTeamId(teamId) {
    try {
      const response = await httpClient.get(`/Employee/by-teamId/${teamId}`);
      return response.data;
    } catch (error) {
      throw error
    }
  }

}


export default EmployeeService;

