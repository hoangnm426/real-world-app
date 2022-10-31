import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Set user default state
  const [user, setUser] = useState({
    user: { username: "", email: "", password: "" },
  });

  // Set username input default state
  const [username, setUsername] = useState("");

  // Set email input default state
  const [email, setEmail] = useState("");

  // Set password input default state
  const [password, setPassword] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Function handleUsernameInput
  const handleUsernameInput = (e) => {
    let usernameInputText = e.target.value;
    setUsername(usernameInputText);
  };

  // Function handleEmailInput
  const handleEmailInput = (e) => {
    let emailInputText = e.target.value;
    setEmail(emailInputText);
  };

  // Function handlePasswordInput
  const handlePasswordInput = (e) => {
    let passwordInputText = e.target.value;
    setPassword(passwordInputText);
  };

  // Function handleSubmitNewUser
  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    user.user.username = username;
    user.user.email = email;
    user.user.password = password;

    axios
      .post("https://api.realworld.io/api/users", user)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Your Name"
          onChange={handleUsernameInput}
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Email"
          onChange={handleEmailInput}
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          onChange={handlePasswordInput}
        />
      </fieldset>
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        onClick={handleSubmitNewUser}
      >
        Sign up
      </button>
    </form>
  );
}

export default Register;
