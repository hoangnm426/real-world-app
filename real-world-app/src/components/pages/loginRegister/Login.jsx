import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // Set user default state
  const [user, setUser] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  // Set emailInputText default state
  const [emailInputText, setEmailInputText] = useState("");

  // Set passwordInputText default state
  const [passwordInputText, setPasswordInputText] = useState("");

  // Set navigate
  const navigate = useNavigate();

  // Function handleEmailInput
  const handleEmailInput = (e) => {
    let emailInputText = e.target.value;
    setEmailInputText(emailInputText);
  };

  // Function handlePasswordInput
  const handlePasswordInput = (e) => {
    let passwordInputText = e.target.value;
    setPasswordInputText(passwordInputText);
  };

  // Function handleSignin
  const handleSignIn = (e) => {
    e.preventDefault();
    user.user.email = emailInputText;
    user.user.password = passwordInputText;

    axios
      .post("https://api.realworld.io/api/users/login", user)
      .then((response) => {
        const resUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(resUser));
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Your Email"
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
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </form>
  );
}

export default Login;
