import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

function Article() {
  // get params form url
  let slug = useParams();

  const navigate = useNavigate();

  // return user context
  const userContext = useContext(UserContext);

  // Set user default state
  const [user, ] = useState({
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

  // Set default article detail state
  const [articleDetail, setArticleDetail] = useState(null);

  // Set default comments detail state
  const [articleComments, setArticleComments] = useState([]);

  // Set default comment input state
  const [commentInput, setCommentInput] = useState({
    comment: {
      body: "",
    },
  });

  // Set default comment state
  const [comment, setComment] = useState({});

  // Set default comment input text
  const [commentInputText, setCommentInputText] = useState("");

  // Function get article detail
  const getArticleDetail = () => {
    axios
      .get(`https://api.realworld.io/api/articles/${slug.article}`)
      .then((response) => {
        const resArticleDetail = response.data.article;
        setArticleDetail(resArticleDetail);
      })
      .catch((error) => console.log(error));
  };

  // Function get all comments
  const getAllComments = () => {
    axios
      .get(
        `https://api.realworld.io/api/articles/${slug.article}/comments`,
        option
      )
      .then((response) => {
        const resAllComments = response.data.comments;
        resAllComments.sort(function (a, b) {
          return b.id - a.id;
        });

        setArticleComments(resAllComments);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArticleDetail();
    getAllComments();
  }, [change]);

  // Function handleCommentInput
  const handleCommentInput = (e) => {
    commentInput.comment.body = e.target.value;
    setCommentInputText(e.target.value);
  };

  // Function handleSubmitComment
  const handleSubmitComment = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://api.realworld.io/api/articles/${slug.article}/comments`,
        commentInput,
        option
      )
      .then((response) => {
        setComment(response.data);
        setCommentInputText("");
        setChange(!change);
      })
      .catch((error) => console.log(error));
  };

  // Function handleDeleteComment
  const handleDeleteComment = (e) => {
    const commentId = e.target.dataset.id;

    axios
      .delete(
        `https://api.realworld.io/api/articles/${slug.article}/comments/${commentId}`,
        option
      )
      .then(() => {
        setChange(!change);
      })
      .catch((error) => console.log(error));
  };

  // Function handleDeleteArticle
  const handleDeleteArticle = (e) => {
    const deleteSlug = articleDetail.slug;

    axios
      .delete(`https://api.realworld.io/api/articles/${deleteSlug}`, option)
      .then((response) => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {articleDetail !== null && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{articleDetail.title}</h1>

              <div className="article-meta">
                <Link to="">
                  <img src={articleDetail.author.image} alt="" />
                </Link>
                <div className="info">
                  <Link to="" className="author">
                    {articleDetail.author.username}
                  </Link>
                  <span className="date">{articleDetail.createdAt}</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {articleDetail.author.username}{" "}
                  <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post <span className="counter">(29)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{articleDetail.body}</p>
                <ul className="tag-list">
                  {articleDetail.tagList.map((tag, index) => (
                    <li
                      className="tag-default tag-pill tag-outline ng-binding ng-scope"
                      key={index}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Link to="profile.html">
                  <img src={articleDetail.author.image} alt="" />
                </Link>
                <div className="info">
                  <Link to="" className="author">
                    {articleDetail.author.username}
                  </Link>
                  <span className="date">{articleDetail.createdAt}</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {articleDetail.author.username}
                </button>
                &nbsp;
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleDeleteArticle}
                >
                  <i className="ion-heart"></i>
                  &nbsp; Delete article <span className="counter">(29)</span>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      onChange={handleCommentInput}
                      value={commentInputText}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                      alt=""
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleSubmitComment}
                    >
                      Post Comment
                    </button>
                  </div>
                </form>

                {articleComments.length !== 0 &&
                  articleComments.map((comment, index) => (
                    <div className="card" key={index}>
                      <div className="card-block">
                        <p className="card-text">{comment.body}</p>
                      </div>
                      <div className="card-footer">
                        <Link to="" className="comment-author">
                          <img
                            src={comment.author.image}
                            className="comment-author-img"
                            alt=""
                          />
                        </Link>
                        &nbsp;
                        <Link to="" className="comment-author">
                          {comment.author.username}
                        </Link>
                        <span className="date-posted">{comment.updatedAt}</span>
                        <span className="mod-options" ng-show="$ctrl.canModify">
                          <i
                            className="ion-trash-a"
                            onClick={handleDeleteComment}
                            data-id={comment.id}
                          ></i>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Article;
