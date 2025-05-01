import httpClient from "./httpClient";

class RoleServices{
    static async getRoles(){
        const response = await httpClient.get("/Role",{});
            return response.data;
    }
}

export default RoleServices;