import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

const AuthElement = () => {
  const { user } = useAuthContext()

  let ResComponent =  null

  if(!user){
    
    ResComponent = <Navigate to="/login"  />
  }else{
      
      ResComponent = <Outlet />
  }
    
  return (
    <>
      {ResComponent}
    </>
  );
};

export default AuthElement;
