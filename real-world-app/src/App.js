// import logo from "./logo.svg";
// import "./App.css";
import "./css/mystyle.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import LoginRegister from "./components/pages/loginRegister/LoginRegister.jsx";
import Profile from "./components/pages/Profile.jsx";
import Setting from "./components/pages/Setting.jsx";
import CreateEditArticle from "./components/pages/articles/CreateEditArticle";
import Article from "./components/pages/articles/Article";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main-app">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<LoginRegister isLogin />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/editor" element={<CreateEditArticle />} />
            <Route path="/article/:article" element={<Article />} />
            <Route path="/profile/*" element={<Profile />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
