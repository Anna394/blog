import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateArticle } from '../../api/editarticle'; // Ты создашь updateArticle
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function EditArticlePage() {
  const { slug } = useParams();
  const { articles } = useSelector((state) => state.data);
  const article = articles.find((a) => a.slug === slug);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!article) return <p>Loading...</p>;

  const handleEdit = (data) => {
    dispatch(updateArticle(slug, data));
    navigate(`/`);
  };

  return (
    <ArticleForm
      onSubmit={handleEdit}
      initialData={{
        title: article.title,
        description: article.description,
        text: article.body,
        tags: article.tagList || []
      }}
      mode="edit"
    />
  );
}
