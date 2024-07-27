import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isConnected = sessionStorage.getItem("publicKey");
  console.log("coming from protected:", isConnected);
  if (isConnected === null) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};
