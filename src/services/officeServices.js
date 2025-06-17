import httpClient from "./httpClient";

class OfficeServices{
    static async getOffices(){
        const response = await httpClient.get("/Office",{});
        return response.data;
    }
    static async addOffice(data){
        const response = await httpClient.post("/Office",data);
        return response.data;
    }
}

export default OfficeServices;