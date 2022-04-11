import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const Login = () => {
  const host = "https://mynotes-back-end.herokuapp.com";

  let history= useHistory();
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if(json.success){
        // login and redirect 
        localStorage.setItem('token', json.authtoken);
        history.push("/");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3 row my-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control-plaintext"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-3 row my-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
