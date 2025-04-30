// const API_CONFIG = {
//     BASE_URL: ,
//     TIMEOUT: 5000,  
//     HEADERS: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer YOUR_API_KEY", 
//     },
//   };
  
//   export default API_CONFIG;
  
  const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,  // Get the base URL from the .env file
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT),  // Get the timeout from the .env file
    HEADERS: {
      "Content-Type": "application/json",
      "Authorization": `Bearer `,  // Get the API key from the .env file
    },
  };

  export default API_CONFIG;
  