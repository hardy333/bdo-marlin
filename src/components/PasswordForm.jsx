import React, { useState } from "react";

const PasswordForm = () => {
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword:""
  })


  const inputchange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})

  }


  console.log(inputs)
  
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(e)

    
    
    
  }
  
  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      {/* 1 */}
      <div className="form-control">
        <label htmlFor="oldPassword">ძველი პაროლი</label>
        <input
          className="input"
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={inputs.oldPassword}
          onChange={inputchange}
          placeholder="ძეველი პაროლი"
        />
      </div>
      {/* 2 */}
      <div className="form-control">
        <label htmlFor="newPassword">ახალი პაროლი</label>
        <input
          className="input"
          type="newPassword"
          id="newPassword"
          name="newPassword"
          value={inputs.newPassword}
          onChange={inputchange}
          placeholder="ახალი პაროლი"
        />
      </div>
      {/* 3 */}
      <div className="form-control">
        <label htmlFor="confirmNewPassword">გაიმეორეთ</label>
        <input
          className="input"
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          valie={inputs.confirmNewPassword}
          onChange={inputchange}
          placeholder="გაიმეორეთ ძველი პაროლი"
        />
      </div>
      <button className="btn btn-success">განახლება</button>
    </form>
  );
};

export default PasswordForm;
