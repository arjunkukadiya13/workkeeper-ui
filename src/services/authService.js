// import axios from "axios";
import httpClient from "./httpClient";

// const API_BASE_URL = "https://localhost:7203/api/auth"; 

// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, { email, password }, {
//       headers: { "Content-Type": "application/json" },
//     });
//     console.log(response.data);
//     return response.data; // Returns { token: "JWT_TOKEN" }
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Login failed");
//   }
// };



const userApi = {
  login: async (email, password) => {
    try {
      const response = await httpClient.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  validateToken: async (token) => {
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
  
};

export default userApi;

