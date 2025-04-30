import httpClient from "./httpClient";

class DepartmentService{
    static async getDepartment(){
        const response = await httpClient.get("/Department",{});
        return response.data;
    }
}
export default DepartmentService;