import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const x = window.localStorage.getItem("user");

let user = null;

if (x) {
  user = JSON.parse(x);
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  if (!user?.decodedToken || !user?.token) {
    if (user) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      user = null;
    }
  }

  const [state, dispatch] = useReducer(authReducer, { user });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
