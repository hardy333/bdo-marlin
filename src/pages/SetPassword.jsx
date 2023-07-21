import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const SetPassword = () => {
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>გამარჯობა ნიკა ლობჟანიძე!</h1>
          <p className="text-center mt-[-40px] mb-20">
            შექმნი პაროლი შენი მომხმარებლისთვის.
          </p>

          <form action="" className="login-form">
            <input className="input" type="password" placeholder="პაროლი" />
            <input
              className="input"
              type="password"
              placeholder="გაიმეორე პაროლი"
            />
            {/*  */}
            <div className="mb-10 flex items-start  flex-col max-w-[230px] ms-auto me-auto">
              {/* 1 checkobx */}
              <p className="register-form__terms items-center justify-start">
                <input type="checkbox" className="checkbox" />
                <span>მე არ ვარ რობოტი.</span>
              </p>
              {/* 2 checkobx */}
              <p className="register-form__terms  mt-5">
                <input type="checkbox" className="checkbox" />
                <span>
                  ვეთანხმები{" "}
                  <a className="link login-link" href="#">
                    წესებს და პირობებს
                  </a>
                </span>
              </p>
            </div>

            <button className="btn btn-blue">Log in</button>

            <p className="login-form__login">
              უკვე დარეგისტრირებული ხარ?{" "}
              <Link className="link login-link" to="/log-in">
                შესვლა.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
