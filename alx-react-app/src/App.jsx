import React from "react";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <h1>User Profile</h1>

      <UserProfile
        name="Alice"
        age={25}
        bio="Loves hiking and photography" />
      <UserProfile
        name="Bob"
        age={30}
        bio="Enjoys painting and traveling" />
      <UserProfile
        name="Charlie"
        age={28}
        bio="Passionate about coding and React" />
    </div>
  );
}

export default App;
