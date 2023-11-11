import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RetailerRoutesProtection = () => {

    const { user } = useAuthContext()

  console.log("protected", user)
  
  console.log("..", user.decodedToken.IsRetail !== "True")

  if(user.decodedToken.IsRetail !== "True"){
    return <Navigate to="/"  />
  }


  return (
    <Outlet />

  )
}

export default RetailerRoutesProtection