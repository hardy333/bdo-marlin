import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileForm = () => {
  const {user } = useAuthContext()

  const [inputs, setInputs] = useState({
    firstName: user.decodedToken.FirstName,
    lastName: user.decodedToken.LastName,
    number: "",
    email: user.decodedToken.Email
  })

  console.log(user)

  const onChnage = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})


  }

  const onSubmit = (e) => {
    e.preventDefault()

  }
  
  
  return (
    <form onSubmit={onSubmit} className="profile-form">
      {/* 1 */}
      <div className="form-control">
        <label htmlFor="name">სახელი</label>
        <input
          className="input"
          type="text"
          id="name"
          placeholder="თქვენი სახელი"
          value={inputs.firstName}
        />
      </div>
      {/* 2 */}
      <div className="form-control">
        <label htmlFor="surname">გვარი</label>
        <input
          className="input"
          type="text"
          id="surname"
          placeholder="თქვენი გვარი"
          value={inputs.lastName}
        />
      </div>
      {/* 3 */}
      <div className="form-control">
        <label htmlFor="number">ნომერი</label>
        <input className="input" type="number" placeholder="თქვენი ნომერი" />
      </div>
      {/* 4 */}
      <div className="form-control">
        <label htmlFor="email">მეილი</label>
        <input className="input" type="text" placeholder="თქვენი მეილი" value={inputs.email} />
      </div>
      <button className="btn btn-success">განახლება</button>
    </form>
  );
};

export default ProfileForm;
