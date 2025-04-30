import styles from "./ArticleList.module.scss";
import Article from "../Article/Article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../../api/articles";

function ArticleList() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className={styles.articlelist}>
      {articles.map((article) => (
        <Article article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
