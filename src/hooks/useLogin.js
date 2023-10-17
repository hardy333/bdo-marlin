import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.marlin.ge/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(` status: ${response.status}, statustext: ${response.statusText}`);
      }


      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
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
