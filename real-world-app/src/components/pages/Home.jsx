import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import GlobalArticles from "./articles/GlobalArticles";
import YourArticles from "./articles/YourArticles";
import TagArticles from "./articles/TagArticles";
import { UserContext } from "../../context/UserContext";

function Home() {
  // return user context
  const userContext = useContext(UserContext);

  // Set user default state
  const [user, setUser] = useState({
    user: {
      bio: userContext.bio,
      email: userContext.email,
      image: userContext.image,
      token: userContext.token,
      username: userContext.username,
      password: "",
    },
  });

  const option = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${user.user.token}`,
      Accept: "application/json",
    },
  };
  // set tags default state
  const [tagsArray, setTagsArray] = useState([]);

  // Set default active state
  const [active, setActive] = useState("active");

  // Set default disable state
  const [notActive, setNotActive] = useState("disabled");

  // Set default tag active state
  const [tagActive, setTagActive] = useState("disabled");

  // Set default tag name state
  const [tagName, setTagName] = useState("");

  // Function getAllTags
  const getAllTags = () => {
    axios.get("https://api.realworld.io/api/tags", option).then((response) => {
      const resTagsArray = response.data.tags;
      setTagsArray(resTagsArray);
    });
  };

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

  // Function handleTagActive
  const handleTagActive = () => {};

  // useEffect
  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item" onClick={handleNotActive}>
                  <Link className={`nav-link ${notActive}`} to="/yourarticles">
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item" onClick={handleActive}>
                  <Link className={`nav-link ${active}`} to="/">
                    Global Feed
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={handleTagActive}
                  style={{ display: "none" }}
                >
                  <Link to="" className={`nav-link ${tagActive} ng-binding`}>
                    <i className="ion-pound"></i> {tagName}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sub-router">
              <Routes>
                <Route path="/" element={<GlobalArticles />} />
                <Route path="/yourarticles" element={<YourArticles />} />
                <Route path="/tag/:tag" element={<TagArticles />} />
              </Routes>
            </div>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tagsArray.map((tag, index) => (
                  <Link
                    to={`/tag/${tag}`}
                    className="tag-pill tag-default"
                    key={index}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
