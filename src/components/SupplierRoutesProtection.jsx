import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const SupplierRoutesProtection = () => {
    const { user } = useAuthContext()

    
  
    if(user.decodedToken.IsRetail === "1"){
      return <Navigate to="/"  />
    }
  
  
    return (
      <Outlet />
  
    )
}

export default SupplierRoutesProtection