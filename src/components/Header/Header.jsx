import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchLogout } from "../../store/signReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../api/getuser";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.signUp);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const signInClick = () => {
    navigate(`/signin`);
  };

  const signUpClick = () => {
    navigate(`/signup`);
  };

  const handleProfile = () => {
    navigate(`/profile`);
  };

  const createArticleClick = () => {
    navigate(`/new-article`);
  };

  const mainPageClick = () => {
    navigate("/");
  };

  function HeaderLogin() {
    if (isAuthenticated) {
      return (
        <div className={styles.loginButtons}>
          <button onClick={createArticleClick} className={styles.createArticle}>
            Create article
          </button>
          <button className={styles.profile}>
            <div onClick={handleProfile}>{user.username}</div>
            <img src={user.image} alt="аватар"></img>
          </button>
          <button onClick={handleLogout} className={styles.logOut}>
            Log out
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.loginButtons}>
          <button onClick={signInClick} className={styles.signIn}>
            Sign In
          </button>
          <button onClick={signUpClick} className={styles.signUp}>
            Sign Up
          </button>
        </div>
      );
    }
  }

  return (
    <div className={styles.header}>
      <button onClick={mainPageClick} className={styles.mainPage}>
        Realworld Blog
      </button>
      <HeaderLogin />
    </div>
  );
}

export default Header;
