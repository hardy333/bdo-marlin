import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RetailerRoutesProtection = () => {

    const { user } = useAuthContext()

  

  if(user.decodedToken.IsRetail === "0"){
    return <Navigate to="/"  />
  }


  return (
    <Outlet />

  )
}

export default RetailerRoutesProtection