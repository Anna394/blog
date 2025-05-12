import styles from './ArticleList.module.scss';
import Article from '../Article/Article';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../api/articles';

function ArticleList() {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.articlelist}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
