import { useDispatch } from "react-redux";
import { createArticle } from "../../api/createarticle";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm/ArticleForm";

export default function NewArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = (data) => {
    dispatch(createArticle(data));
    navigate("/"); // Или куда нужно после создания
  };

  return <ArticleForm onSubmit={handleCreate} mode="create" />;
}
