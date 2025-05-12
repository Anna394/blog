import styles from './Article.module.scss';
import { useNavigate } from 'react-router-dom';
import Like from '../Like/Like';

function Article({ article }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
  };

  const formatDate = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.article}>
      <div className={styles.headerWrapper}>
        <div>
          <div className={styles.headerArticle}>
            <button className={styles.articleTitle} onClick={handleClick}>
              {article.title}
            </button>
            <Like article={article} className={styles.likes} />
          </div>
          <div className={styles.tags}>
            {article.tagList.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <span>{article.author.username}</span>
            <span>{formatDate(article.updatedAt)}</span>
          </div>
          <img src={article.author.image} alt="Аватар"></img>
        </div>
      </div>
      <div className={styles.text}>{article.description}</div>
    </div>
  );
}

export default Article;
