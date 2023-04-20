// import React from "react";
import "./register.css";

import React, { useState } from "react";
import axion from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterpassword: "",
  });

  const handelChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterpassword } = user;
    if (name && email && password && password === reEnterpassword) {
      // alert("Posted");
      axion.post("http://localhost:4500/register", user).then((resp) => {
        alert(resp.data.message);
        history.push("/login");
      });
    } else {
      alert("invalid input ");
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handelChange}
      />
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handelChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handelChange}
      />
      <input
        type="password"
        name="reEnterpassword"
        value={user.reEnterpassword}
        placeholder="Re-enter Password"
        onChange={handelChange}
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
