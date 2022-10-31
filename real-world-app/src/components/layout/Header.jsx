import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    localUser
      ? {
          bio: localUser.bio,
          email: localUser.email,
          image: localUser.image,
          token: localUser.token,
          username: localUser.username,
        }
      : null
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        {user === null ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/editor">
                <i className="ion-compose"></i>&nbsp;New Article
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/setting">
                <i className="ion-gear-a"></i>&nbsp;Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                {user.username}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
