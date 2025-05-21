import { useDispatch } from 'react-redux';
import { createArticle } from '../../api/createarticle';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function NewArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    let success = await dispatch(createArticle(data));
    if (success) {
      navigate('/');
    } else console.error('ошибка');
  };

  return <ArticleForm onSubmit={handleCreate} mode="create" />;
}
