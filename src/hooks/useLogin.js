import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {  useNavigate } from 'react-router'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();


  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)


    console.log(email, password)
    const response = await fetch('https://10.0.0.202:5001/api/Auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "username": email, "password": password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError({status: response.status, statusText: response.statusText})
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      navigate("/")

      // update loading state
      setIsLoading(false)
        setError(null)

    }
  }

  return { login, isLoading, error }
}