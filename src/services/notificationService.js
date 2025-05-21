import httpClient from "./httpClient";

class NotificationService{
    static async newLeaveNotification(data){
        const response = await httpClient.post("/Notification",data)
        return response.data;
    }
    static async getEmployeeNotification(employeeId, page = 1, pageSize = 10) {
        const response = await httpClient.get(`/Notification/employee/${employeeId}`, {
            params: { page, pageSize }
        });
        return response.data;
    }

}

export default NotificationService;