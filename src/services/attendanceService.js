import httpClient from "./httpClient";

class AttendanceService{
    
    static async getUserAttendance(id){
        const response = await httpClient.get(`AttendanceLog/employee/${id}`);
        return response.data;
    }

}
export default AttendanceService;