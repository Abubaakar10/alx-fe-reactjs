import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";


function App() {
  return (
    <div>
      <Header />
      <MainContent />

      <UserProfile
        name="Alice"
        age={25}
        bio="Loves hiking and photography"
      />
      <UserProfile
        name="Bob"
        age={30}
        bio="Enjoys painting and traveling"
      />
      <UserProfile
        name="Charlie"
        age={28}
        bio="Passionate about coding and React"
      />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
