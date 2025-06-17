import httpClient from "./httpClient";

class ShiftService {
    static async getShifts() {
        const response = await httpClient.get("/Shift");
        return response.data;
    }
    static async addShift(data) {
        const response = await httpClient.post("/Shift", data);
        return response.data;
    }
}

export default ShiftService;