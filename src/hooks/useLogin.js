import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.marlin.ge/api/AuthFront/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }),
      });

      const token = await response.json();

      console.log({token, response})

      if (!response.ok) {
        throw new Error(` status: ${response.status}, statustext: ${response.statusText}`);
      }

      console.log("Response ok ", response.ok )

      if (response.ok) {
        const decodedToken = jwtDecode(token.token);
        
        
        const user = {token:token.token, decodedToken}
        
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(user));

        // update the auth context
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");

        // update loading state
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  return { login, isLoading, error };
};
