import React, { useEffect } from "react";
import "../styles/register.css";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";

const url = "https://10.0.0.202:5001/api/Users";
// const url = "https://jsonplaceholder.typicode.com/users";

const y = {
  id: 0,
  accountID: "string",
  userID: "string",
  firstName: "Nick",
  lastName: "White",
  contactNumber: "string",
  email: "string",
  description: "string",
  positionInCompany: "string",
  password: "string",
};

const x = {
  userID: "string",
  firstName: "Nick 2",
  lastName: "string 2321321",
  contactNumber: "string",
  email: "string",
  description: "string",
  positionInCompany: "string",
  password: "string",
};

const Register = () => {
  useEffect(() => {
    console.log("123");
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="register">
        <div className="register__container">
          <h1>Register</h1>
          <form
            action="https://10.0.0.202:5001/api/Users"
            className="register-form"
            method="post"
          >
            <div className="register-form__grid">
              <input
                className="input"
                type="number"
                name="id"
                placeholder="id"
              />
              <input
                className="input"
                type="text"
                name="accountID"
                placeholder="account Id"
              />
              <input
                className="input"
                type="text"
                name="userID"
                placeholder="user Id"
              />
              <input
                className="input"
                type="text"
                name="firstName"
                placeholder="first name"
              />
              <input
                className="input"
                type="text"
                name="lastName"
                placeholder="last name"
              />
              <input
                className="input"
                type="text"
                name="contactNumber"
                placeholder="contact number"
              />
              <input
                className="input"
                type="text"
                name="email"
                placeholder="E-mail"
              />
              <input
                className="input"
                type="text"
                name="description"
                placeholder="description"
              />
              <input
                className="input"
                type="text"
                name="positionInCompany"
                placeholder="Role in company"
              />
              <input
                className="input"
                type="text"
                name="password"
                placeholder="password"
              />
              {/* <div className="register-form__checkbox-container">
                <input type="radio" name="type" id="buyer" />
                <label htmlFor="buyer">Buyer</label>
                <input type="radio" name="type" id="supplier" />
                <label htmlFor="supplier">Supplier</label>
                <input type="radio" name="type" id="both" />
                <label htmlFor="both">Both</label>
              </div> */}
            </div>

            {/*  */}
            {/*  */}
            {/*  */}
            <p className="register-form__terms">
              {/* <input type="checkbox" /> */}
              <span>
                I accept{" "}
                <a className="link login-link" href="#">
                  terms and conditions
                </a>
              </span>
            </p>
            <button className="btn btn-blue" onClick={handleClick}>
              Register
            </button>
            <p className="register-form__login">
              Already have an account?{" "}
              <Link className="link login-link" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
