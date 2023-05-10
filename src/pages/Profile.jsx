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

// import illustration1 from "../assets/profile-illustration-1.svg";
// import illustration2 from "../assets/profile-illustration-2.svg";
import illustration1 from "../assets/profile-illustrations/a.jpg";
import illustration2 from "../assets/profile-illustrations/b.jpg";

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
          {/* <div className="input-wrapper">
            <input type="text" className="input" />
            <img src={searchSvg} alt="" />
          </div> */}
        </header>
        {/*  */}

        <section className="profile-content-container">
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
          {/* Illustration */}
          <div className="illustration-container">
            {param === "/profile" ? (
              <img src={illustration1} alt="" />
            ) : (
              <img src={illustration2} alt="" />
            )}
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
