import styles2 from './ArticleFullCard.module.scss';
import styles from '../Article/Article.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteArticle } from '../../api/deletearticle';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Like from '../Like/Like';
import { fetchData } from '../../api/articles';

function ArticleFullCard() {
  const { slug } = useParams();
  const { articles } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const article = articles.find((article) => article.slug === slug);

  const formatDate = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const dispatch = useDispatch();

  const handleDelete = (slug) => {
    if (window.confirm('Удалить статью?')) {
      dispatch(deleteArticle(slug));
      navigate(`/`);
      fetchData();
    }
  };

  const handleEdit = (slug) => {
    navigate(`/articles/${slug}/edit`);
  };

  function ThisUser() {
    if (article.author.username === user.username) {
      return (
        <div className={styles2.buttons}>
          <button
            className={styles2.delete}
            onClick={() => handleDelete(article.slug)}
          >
            Delete
          </button>
          <button
            className={styles2.edit}
            onClick={() => handleEdit(article.slug)}
          >
            Edit
          </button>
        </div>
      );
    }
  }
  return (
    <div className={styles2.bodyArcticle}>
      <div className={styles2.article}>
        <div className={styles.headerWrapper}>
          <div>
            <div className={styles.headerArticle}>
              <span className={styles.articleTitle}>{article.title}</span>
              <Like article={article} className={styles.likes} />
            </div>
            <div className={styles.tags}>
              {article.tagList.map((tag) => (
                <div className={styles.tag}>{tag}</div>
              ))}
            </div>
          </div>
          <div className={styles2.profile}>
            <div className={styles.profileInfo}>
              <span>{article.author.username}</span>
              <span>{formatDate(article.updatedAt)}</span>
            </div>
            <img src={article.author.image} alt=""></img>
          </div>
        </div>
        <div className={styles2.descriptionAndButtons}>
          <div className={styles.text}>{article.description}</div>
          <ThisUser />
        </div>
        <ReactMarkdown>{article.body}</ReactMarkdown>
        {/* <div className={styles.body}>{article.body}</div> */}
      </div>
    </div>
  );
}

export default ArticleFullCard;
