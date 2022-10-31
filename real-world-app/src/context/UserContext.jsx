import { useState, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  // Get user data from local storage
  const localUser = JSON.parse(localStorage.getItem("user"));
  // Set signedInUSer default state
  const [signedInUser, setSignedInUser] = useState(
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
    <UserContext.Provider value={signedInUser}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
