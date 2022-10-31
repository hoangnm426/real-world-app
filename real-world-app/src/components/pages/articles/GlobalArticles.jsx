import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

function GlobalArticles() {
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
  // Set default change state
  const [change, setChange] = useState(false);

  // Set default articles array state
  const [globalArticlesArray, setGlobalArticlesArray] = useState([]);

  // Function get All global articles
  const getAllGlobalArticles = () => {
    axios
      .get("https://api.realworld.io/api/articles", option)
      .then((response) => {
        const resGlobalArticles = response.data.articles;
        setGlobalArticlesArray(resGlobalArticles);
      });
  };

  useEffect(() => {
    getAllGlobalArticles();
  }, [change]);

  return (
    <>
      {globalArticlesArray.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to="profile.html">
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link to="" className="author">
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          </div>
          <Link to={`/article/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
          </Link>
        </div>
      ))}
    </>
  );
}

export default GlobalArticles;
