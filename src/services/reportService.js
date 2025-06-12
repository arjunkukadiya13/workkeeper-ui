import httpClient from "./httpClient";

class ReportService{
    static async employeeWorkHours(startDate,endDate){

    }
    static async dailyTeamPresence(startDate,endDate){
        const response = await httpClient.get("/Report/team-daily-presence",{
            params:{
                startDate,
                endDate
            }
        })
        return response.data;
    }
    static async attendanceTrends(startDate,endDate){
        const response = await httpClient.get("/Report/attendance-trend",{
            params:{
                startDate,
                endDate
            }
        })
        return response.data;
    }
    static async getEarlyLeavers(startDate,endDate){
        const response = await httpClient.get("/Report/early-leavers",{
            params:{
                startDate,
                endDate
            }
        })
        return response.data;
    }
}
export default ReportService;