import React from "react";

const ProfileForm = () => {
  return (
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
        <input className="input" type="text" placeholder="Enter your Email" />
      </div>
      <button className="btn btn-success">Update and save</button>
    </form>
  );
};

export default ProfileForm;
