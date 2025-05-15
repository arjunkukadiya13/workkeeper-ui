import httpClient from "./httpClient";

class LeaveService{
    static async getLeaveTypes(){
        const response = await httpClient.get("/LeaveType");
        return response.data;
    }
    static async getEmployeeLeaveById(id){
        const response = await httpClient.get(`/Leave/${id}`);
        return response.data;
    }
}
export default LeaveService;