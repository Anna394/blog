import styles from "./App.module.scss";
import ArticleList from "./components/ArticleList/ArticleList";
import ArticleFullCard from "./components/ArticleFullCard/ArticleFullCard";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SighUp/SignUp";
import Login from "./components/Login/Login";
import NewArticle from "./components/NewArticle/NewArticle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import EditArticleForm from "./components/EditArticle/EditArticle.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const userData = JSON.parse(saved);
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    }
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:slug" element={<ArticleFullCard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<UpdateUser />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticleForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
