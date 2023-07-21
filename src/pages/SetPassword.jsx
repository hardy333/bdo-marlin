import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const SetPassword = () => {
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>Hello User!</h1>
          <p className="text-center mt-[-40px] mb-20">
            Please create password to finalize creating you account
          </p>

          <form action="" className="login-form">
            <input className="input" type="password" placeholder="Password" />
            <input
              className="input"
              type="password"
              placeholder="Repeat Password"
            />
            {/*  */}
            <div className="mb-10 flex items-start  flex-col max-w-[230px] ms-auto me-auto">
              {/* 1 checkobx */}
              <p className="register-form__terms items-center justify-start">
                <input type="checkbox" className="checkbox" />
                <span>
                  I am not a robot.
                </span>
              </p>
              {/* 2 checkobx */}
              <p className="register-form__terms">
                <input type="checkbox" className="checkbox" />
                <span>
                  I accept{" "}
                  <a className="link login-link" href="#">
                    terms and conditions
                  </a>
                </span>
              </p>
            </div>

            <button className="btn btn-blue">Log in</button>

            <p className="login-form__login">
              Olready have an account?{" "}
              <Link className="link login-link" to="/log-in">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
