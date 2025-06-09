// import axios from "axios";
import httpClient from "./httpClient";

class AuthService{
  static async login(email,password){
    try {
      const response = await httpClient.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async validateToken(token){
    try {
      const response = await httpClient.post(
        "/auth/validatetoken",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status; 
    } catch (error) {
      console.error("Token validation failed:", error.response?.data || error.message);
      throw error;
    }
  }
  static async passwordUpdate(email,newPassword){
      const response = await httpClient.post("/")
  }
}


export default AuthService;

