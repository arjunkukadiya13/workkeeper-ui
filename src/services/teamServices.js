class TeamServices{
    static async getTeams(){
        const response = await httpClient.get("/Team",{});
        return response.data
    }
}

export default TeamServices;