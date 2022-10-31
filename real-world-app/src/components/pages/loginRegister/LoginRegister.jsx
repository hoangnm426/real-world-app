import React from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function LoginRegister(prop) {
  // set check login
  const isLogin = prop.isLogin;

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="">Have an account?</Link>
            </p>

            {/* <ul className="error-messages">
                <li>That email is already taken</li>
              </ul> */}

            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
