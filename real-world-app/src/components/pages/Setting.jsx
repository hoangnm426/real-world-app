import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Setting() {
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

  // Set imageText default state
  const [imageText, setImageText] = useState(userContext.image);

  // Set usernameText default state
  const [usernameText, setUsernameText] = useState(userContext.username);

  // Set bioText default state
  const [bioText, setBioText] = useState(userContext.bio);

  // Set emailText default state
  const [emailText, setEmailText] = useState(userContext.email);

  // Set newPasswordText default state
  const [newPasswordText, setNewPasswordText] = useState(userContext.password);

  // Function handleOnChangeImage
  const handleOnChangeImage = (e) => {
    let imageTextInput = e.target.value;
    setImageText(imageTextInput);
  };

  // Function handleOnChangeUsername
  const handleOnChangeUsername = (e) => {
    let usernameTextInput = e.target.value;
    setUsernameText(usernameTextInput);
  };

  // Function handleOnChangeBio
  const handleOnChangeBio = (e) => {
    let bioTextInput = e.target.value;
    setBioText(bioTextInput);
  };

  // Function handleOnChangeEmail
  const handleOnChangeEmail = (e) => {
    let emailTextInput = e.target.value;
    setEmailText(emailTextInput);
  };

  // Function handleOnChangePassword
  const handleOnChangePassword = (e) => {
    let newPasswordTextInput = e.target.value;
    setNewPasswordText(newPasswordTextInput);
  };

  // Function handleUpdateButton
  const handleUpdateButton = (e) => {
    e.preventDefault();

    user.user.bio = bioText;
    user.user.email = emailText;
    user.user.image = imageText;
    user.user.username = usernameText;
    user.user.password = newPasswordText;

    axios
      .put("https://api.realworld.io/api/user", user, option)
      .then((response) => {
        const resUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(resUser));
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  // Function handleSignOutButton
  const handleSignOutButton = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={imageText != null ? imageText : ""}
                    onChange={handleOnChangeImage}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={usernameText != null ? usernameText : ""}
                    onChange={handleOnChangeUsername}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    value={bioText != null ? bioText : ""}
                    onChange={handleOnChangeBio}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={emailText != null ? emailText : ""}
                    onChange={handleOnChangeEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={newPasswordText != null ? newPasswordText : ""}
                    onChange={handleOnChangePassword}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-left"
                  onClick={handleSignOutButton}
                >
                  Sign Out
                </button>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={handleUpdateButton}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
