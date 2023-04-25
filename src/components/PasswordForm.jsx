import React from "react";

const PasswordForm = () => {
  return (
    <form className="profile-form">
      {/* 1 */}
      <div className="form-control">
        <label htmlFor="name">Old Password</label>
        <input
          className="input"
          type="password"
          id="name"
          placeholder="Enter your Name"
        />
      </div>
      {/* 2 */}
      <div className="form-control">
        <label htmlFor="surname">New Password</label>
        <input
          className="input"
          type="password"
          id="surname"
          placeholder="Enter your Surname"
        />
      </div>
      {/* 3 */}
      <div className="form-control">
        <label htmlFor="number">Repeat</label>
        <input
          className="input"
          type="password"
          placeholder="Enter your Number"
        />
      </div>
      <button className="btn btn-success">Update and save</button>
    </form>
  );
};

export default PasswordForm;
