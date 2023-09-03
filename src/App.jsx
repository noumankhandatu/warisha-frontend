import React from "react";
import ProtectedRoutes from "./routers/protected";
import PublicRoutes from "./routers/public";

const App = () => {
  const token = localStorage.getItem("jwtToken");
  return <div>{token ? <ProtectedRoutes /> : <PublicRoutes />}</div>;
};

export default App;
