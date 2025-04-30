class OfficeServices{
    static async getOffices(){
        const response = await httpClient.get("/Office",{});
        return response.data;
    }
}

export default OfficeServices;