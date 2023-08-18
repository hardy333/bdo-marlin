import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(email, password)


  }

  
  
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>Welcome Again!</h1>


          <form action="" className="login-form" onSubmit={handleSubmit}>
           <span className={`login-error ${error && "active"}`}>პაროლი ან მეილი არასწორია.</span> 
            <input required className="input" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <small className="ml-auto ">
              <a href="" className="login-link">
                დაგავიწყდათ პაროლი?
              </a>
            </small>
            <button type="submit" className="btn btn-blue" >შესვლა</button>
            <p className="login-form__login">
              არ გაქვთ ექაუნთი?{" "}
              <Link className="link login-link" to="/register">
                დარეგისტრირდით
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
