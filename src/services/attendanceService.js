import httpClient from "./httpClient";

class AttendanceService{
    
    static async getUserAttendance(id){
        const response = await httpClient.get(`AttendanceLog/employee/${id}`);
        return response.data;
    }
    static async addUserAttendance(data){
        const response = await httpClient.post("AttendanceLog",data)
        return response.data;
    }
    static async getLogsBetweenDates(id, startDate, endDate) {
    const response = await httpClient.get(
        `AttendanceLog/between-dates-by-employee?employeeId=${id}&startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
}


}
export default AttendanceService;