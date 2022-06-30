import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  let errorList;

  if (errors.length > 0) {
    errorList = "errorList";
  } else {
    errorList = "";
  }

  let footer = document.querySelector(".footer")
  if (footer) {
    footer.classList.add("footer-position")
  }

  return (
    <div className="login-form-container">
      <h3 id="login-title">Welcome! Login for FRAMED here</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className={errorList}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-box">
          <div>
            <label>Username or Email </label>
            <input className="input-field"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password </label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button id="button-login" type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
