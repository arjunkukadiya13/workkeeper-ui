import React from 'react';

const PageNotFound = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      color: "#333",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "80px", margin: "0" }}>404</h1>
      <h2 style={{ margin: "10px 0" }}>Page Not Found</h2>
      <p style={{ marginTop: "10px" }}>
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default PageNotFound;
