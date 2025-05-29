import httpClient from "./httpClient";

class AttendanceService {

    static async getUserAttendance(id) {
        const response = await httpClient.get(`AttendanceLog/employee/${id}`);
        return response.data;
    }
    static async getUserAttendancePaginate(id, pageNumber = 1, pageSize = 10) {
        const response = await httpClient.get(`AttendanceLog/employee/paginated/${id}`, {
            params: {
                pageNumber,
                pageSize
            }
        }
        );
        return response.data;
    }

    static async addUserAttendance(data) {
        const response = await httpClient.post("AttendanceLog", data)
        return response.data;
    }
    static async getLogsBetweenDates(id, startDate, endDate) {
        const response = await httpClient.get(
            `AttendanceLog/between-dates?employeeId=${id}&startDate=${startDate}&endDate=${endDate}`
        );
        return response.data;
    }
    static async updateAttendance(id, data) {
        const response = await httpClient.put(`AttendanceLog/${id}`, data)
    }
    static async getLastAttendanceLog(id) {
        const response = await httpClient.get(`AttendanceLog/employee/last-two/${id}`)
        return response.data;
    }
    static async todaysPresentEmployees(date) {
        const response = await httpClient.get("AttendanceLog/presence", {
            params: { date: date }
        });
        return response.data;
    }

}
export default AttendanceService;