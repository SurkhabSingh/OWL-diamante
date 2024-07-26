import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isConnected = sessionStorage.getItem("public_address");
  console.log("coming from protected:", isConnected);
  if (isConnected === null) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};
