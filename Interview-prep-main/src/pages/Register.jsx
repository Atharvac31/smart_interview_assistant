import React, { useState } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
import { useNavigate,Link } from 'react-router-dom';

import "./Register.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = { firstname, lastname, email, password };
    const response = await makeUnauthenticatedPOSTRequest("/api/auth/register", data);
    console.log(response)
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Registration successful!");
      navigate("/");
    } else {
      alert(response.err || "Registration failed");
    }
  };

  return (
    <section id="registration-page">
      <div className="card">
        <h2>Create Your Account</h2>
        <form id="registration-form" onSubmit={register}>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Register</button>
          <Link to="/login" className="link">Already have an account? Login</Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
