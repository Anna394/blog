import styles from './ArticleList.module.scss';
import Article from '../Article/Article';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../api/articles';
import PaginationComponent from './PaginationComponent';

function ArticleList() {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.data);

  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector((state) => state.data.articlesCount);

  useEffect(() => {
    dispatch(fetchData(currentPage));
  }, [currentPage, dispatch]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.articlelist}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}

      <PaginationComponent
        currentPage={currentPage}
        total={total}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default ArticleList;
