import httpClient from "./httpClient";

class DepartmentService{
    static async getDepartment(){
        const response = await httpClient.get("/Department",{});
        return response.data;
    }
    static async addDepartment(data){
        const response = await httpClient.post("/Department",data);
        return response.data;
    }
}
export default DepartmentService;