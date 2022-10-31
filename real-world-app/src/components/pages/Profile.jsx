import React, { useState, useContext } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import GlobalArticles from "./articles/GlobalArticles";
import YourArticles from "./articles/YourArticles";

function Profile() {
  const navigate = useNavigate();

  // return user context
  const userContext = useContext(UserContext);

  // set user default state
  const [user, setUser] = useState({
    user: {
      bio: userContext.bio,
      email: userContext.email,
      image: userContext.image,
      token: userContext.token,
      username: userContext.username,
    },
  });

  // Function handleEditProfileSetting
  const handleEditProfileSetting = () => {
    navigate("/setting");
  };

  // Set default active state
  const [active, setActive] = useState("active");

  // Set default disable state
  const [notActive, setNotActive] = useState("disabled");

  // Function handleNotActive
  const handleNotActive = () => {
    setActive("disabled");
    setNotActive("active");
  };

  // Function handleActive
  const handleActive = () => {
    setActive("active");
    setNotActive("disabled");
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={user.user.image} className="user-img" alt="" />
              <h4>{user.user.username}</h4>
              <p>
                Cofounder @GoThinkster, lived in Aol's HQ for a few months,
                kinda looks like Peeta from the Hunger Games
              </p>
              <button
                className="btn btn-sm btn-outline-secondary action-btn"
                onClick={handleEditProfileSetting}
              >
                <i className="ion-plus-round"></i>
                &nbsp; Edit profile setting
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item" onClick={handleActive}>
                  <Link
                    className={`nav-link ${active}`}
                    to="/profile/yourarticles"
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item" onClick={handleNotActive}>
                  <Link className={`nav-link ${notActive}`} to="/profile/">
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sub-router">
              <Routes>
                <Route path="/" element={<GlobalArticles />} />
                <Route path="/yourarticles" element={<YourArticles />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
