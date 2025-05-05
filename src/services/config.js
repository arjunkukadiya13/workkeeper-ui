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
    BASE_URL: import.meta.env.VITE_API_BASE_URL,  
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT),  
    HEADERS: {
      "Content-Type": "application/json",
      "Authorization": `Bearer `,  
    },
  };

  export default API_CONFIG;
  