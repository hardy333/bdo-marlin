import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import "../styles/profile.css";
import userSvg from "../assets/employees/user.svg";
import user from "../assets/user.png";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import classNames from "classnames";

const Profile = () => {
  const location = useLocation();
  const { pathname } = location;

  const slashIndex = pathname.lastIndexOf("/");
  const param = pathname.slice(slashIndex);

  console.log(param);

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
              <Link
                className={classNames({
                  active: param === "/profile",
                })}
                to="/profile"
              >
                Private Info
              </Link>
              <Link
                to="change-password"
                className={classNames({
                  active: param === "/change-password",
                })}
              >
                Password Change
              </Link>
            </div>
            {/* Right */}
            <div className="right">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
