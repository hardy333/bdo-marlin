import React from "react";
import "../styles/register.css";
import DashboardLayout from "../layout/DashboardLayout";

const Register = () => {
  return (
    <DashboardLayout>
      <div className="register">
        <div className="register__container">
          <h1>Register</h1>
          <form action="" className="register-form">
            <div className="register-form__grid">
              <input className="input" type="email" placeholder="E-mail" />
              <input className="input" type="text" placeholder="Company name" />
              <input
                className="input"
                type="number"
                placeholder="Contact number"
              />
              <input className="input" type="number" placeholder="Company ID" />
              <input
                className="input"
                type="number"
                placeholder="Contact number"
              />
              <input className="input" type="text" placeholder="User name" />
              <input className="input" type="password" placeholder="password" />
              <input
                className="input"
                type="text"
                placeholder="Role in company"
              />
              <input
                className="input"
                type="password"
                placeholder="Repeat password"
              />
              <div className="register-form__checkbox-container">
                <input type="radio" name="type" id="buyer" />
                <label htmlFor="buyer">Buyer</label>
                <input type="radio" name="type" id="supplier" />
                <label htmlFor="supplier">Supplier</label>
                <input type="radio" name="type" id="both" />
                <label htmlFor="both">Both</label>
              </div>
            </div>

            {/*  */}
            {/*  */}
            {/*  */}
            <p className="register-form__terms">
              <input type="checkbox" />
              <span>
                I accept{" "}
                <a className="link" href="#">
                  terms and conditions
                </a>
              </span>
            </p>
            <button className="btn btn-blue">Register</button>
            <p className="register-form__login">
              Already have an account?{" "}
              <a className="link" href="#">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Register;
