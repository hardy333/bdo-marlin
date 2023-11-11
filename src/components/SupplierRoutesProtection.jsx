import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const SupplierRoutesProtection = () => {
    const { user } = useAuthContext()

    console.log("protected", user)
    
  
    if(user.decodedToken.IsRetail === "True"){
      return <Navigate to="/"  />
    }
  
  
    return (
      <Outlet />
  
    )
}

export default SupplierRoutesProtection