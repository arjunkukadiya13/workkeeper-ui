import httpClient from "./httpClient";

class ShiftService{
    static async getShifts(){
        const response = await httpClient.get("/Shift");
            return response.data;
    }
}

export default ShiftService;