import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

const AuthElement = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  console.log("authElement", user)

  let ResComponent =  null

  if(!user){
    
    ResComponent = <Navigate to="/login"  />
  }else{
      
      ResComponent = <Outlet />
  }
    
  return (
    <>
      <div>AuthElement</div>
      {ResComponent}
    </>
  );
};

export default AuthElement;
