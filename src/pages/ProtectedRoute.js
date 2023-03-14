import React from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
    const token = localStorage.getItem("jwtToken")
    console.log(token)
    if (token === null){
        return <Navigate to='/login' replace />
      }
    return children       
}
export default ProtectedRoute