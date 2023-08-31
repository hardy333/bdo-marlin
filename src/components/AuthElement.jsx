import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";


const AuthElement = ({children}) => {
  const { user } = useAuthContext()


  if(!user){
    
    return <Navigate to="/login"  />
  }

  
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthElement;
