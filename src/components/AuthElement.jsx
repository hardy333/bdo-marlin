import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";



const AuthElement = () => {
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
