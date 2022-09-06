import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navTo = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json();
    if (json.success) {
      //Save auth token and redirect
      localStorage.setItem("token", json.autTokken);
      props.showAlert(" LOGED IN NOICE :) ", "success");
      navTo("/");
    } else {
      props.showAlert(" INVALID CREDENTIALS :) ", "danger");
    }
    console.log(json);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="mb-3 my-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
