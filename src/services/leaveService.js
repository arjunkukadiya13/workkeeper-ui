import httpClient from "./httpClient";

class LeaveService {
    static async getLeaveTypes() {
        const response = await httpClient.get("/LeaveType");
        return response.data;
    }
    static async addLeaveType(data){
        const response = await httpClient.post("/LeaveType",data);
        return response.data;
    }
    static async getEmployeeLeaveById(id) {
        const response = await httpClient.get(`/Leave/employee/${id}`);
        return response.data;
    }
    static async addNewLeave(data) {
        const response = await httpClient.post("/Leave", data)
        return response.data
    }
    static async getLeavesData() {
        const response = await httpClient.get("/Leave");
        return response.data;
    }
    static async updateLeaveStatus(leaveId, updatedLeave) {
        const response = await httpClient.put(`/Leave/${leaveId}`, updatedLeave)
        return response.data
    }
    static async countEmployeeLeavebyType(id) {
        const response = await httpClient.get(`Leave/employee/leavecounts/${id}`);
        return response.data
    }
    static async getUpcomingHoliday(date) {
        const response = await httpClient.get("/Holiday/from-date", {
            params: { date }
        });
        return response.data;
    }
    static async getTodaysOnLeaveEmployee(date) {
        const response = await httpClient.get(`Leave/by-date`, {
            params: { date }
        });
        return response.data;
    }


}
export default LeaveService;