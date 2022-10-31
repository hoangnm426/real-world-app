import React, { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

function CreateEditArticle() {
  // return user context
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

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

  // Set default tag list stage
  const [tagList, setTagList] = useState([]);

  // Set default article detail state
  const [articleDetail, setArticleDetail] = useState({
    article: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  });

  // Function handleArticleTitleInput
  /**
   * set value for article title
   * @param {*} e 
   */
  const handleArticleTitleInput = (e) => {
    articleDetail.article.title = e.target.value;
  };

  // Function handleArticleDescriptionInput
  const handleArticleDescriptionInput = (e) => {
    articleDetail.article.description = e.target.value;
  };

  // Function handleArticleBodyInput
  const handleArticleBodyInput = (e) => {
    articleDetail.article.body = e.target.value;
  };

  // Function handleTagListInput
  const handleTagListInput = (e) => {};

  // Function handleOnKeyDown
  const handleOnKeyDown = (e) => {
    const tag = e.target.value;
    if (e.keyCode === 13) {
      if (tag === "") {
        alert("Tag list empty");
        return;
      } else {
        let newTagListArray = [...tagList];
        newTagListArray.push(tag);
        setTagList(newTagListArray);
        e.target.value = "";
      }
    }
  };

  // Function handleDeleteTag
  const handleDeleteTag = (e) => {
    let spliceTagListArray = [...tagList];
    const tagIndex = e.target.dataset.index;
    spliceTagListArray.splice(tagIndex, 1);
    setTagList(spliceTagListArray);
  };

  // Function handleSubmitArticleButton
  const handleSubmitArticleButton = () => {
    articleDetail.article.tagList = tagList;
    axios
      .post("https://api.realworld.io/api/articles", articleDetail, option)
      .then((response) => {
        const resArticleDetail = response.data;
        console.log(resArticleDetail);
        navigate(`/article/${resArticleDetail.article.slug}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={handleArticleTitleInput}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={handleArticleDescriptionInput}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    onChange={handleArticleBodyInput}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyDown={handleOnKeyDown}
                  />
                  <div className="tag-list">
                    {tagList.map((tag, index) => (
                      <div className="tag-name" key={index}>
                        <i onClick={handleDeleteTag} data-index={index}>
                          X
                        </i>
                        <p>{tag}</p>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmitArticleButton}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEditArticle;
