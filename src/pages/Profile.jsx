import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import "../styles/profile.css";
import userSvg from "../assets/employees/user.svg";
import user from "../assets/user.png";

const Profile = () => {
  return (
    <DashboardLayout>
      <section className="profile">
        <header className="profile-header">
          <h1>Profile</h1>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <img src={searchSvg} alt="" />
          </div>
        </header>
        {/*  */}
        <div className="profile-card">
          <header className="profile-card-header">
            <div className="profile-card-img-container">
              <img src={user} alt="user" />
            </div>
          </header>
          <div className="profile-form-container">
            {/* Left */}
            <div className="left">
              <a className="active" href="#">
                Private Info
              </a>
              <a href="#">Password Change</a>
            </div>
            {/* Right */}
            <div className="right">
              <form className="profile-form">
                {/* 1 */}
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <input
                    className="input"
                    type="text"
                    id="name"
                    placeholder="Enter your Name"
                  />
                </div>
                {/* 2 */}
                <div className="form-control">
                  <label htmlFor="surname">Surname</label>
                  <input
                    className="input"
                    type="text"
                    id="surname"
                    placeholder="Enter your Surname"
                  />
                </div>
                {/* 3 */}
                <div className="form-control">
                  <label htmlFor="number">Number</label>
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter your Number"
                  />
                </div>
                {/* 4 */}
                <div className="form-control">
                  <label htmlFor="email">E-mail</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your Email"
                  />
                </div>
                <button className="btn btn-success">Update and save</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
