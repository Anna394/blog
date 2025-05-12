import { useSelector } from 'react-redux';
import { setLike } from '../../api/setlike';
import heart from '../../heart.svg';
import heart_red from '../../heart_red.svg';
import { useDispatch } from 'react-redux';

export default function Like({ article, className }) {
  const { isAuthenticated } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  function handleLike() {
    dispatch(setLike(article.slug, article.favorited));
  }

  if (isAuthenticated) {
    return (
      <div className={className}>
        <button onClick={handleLike}>
          {!article.favorited ? (
            <img src={heart} alt="Количество лайков" />
          ) : (
            <img src={heart_red} alt="123"></img>
          )}
        </button>
        {article.favoritesCount}
      </div>
    );
  } else {
    return (
      <div className={className}>
        <img src={heart} alt="Количество лайков"></img>
        {article.favoritesCount}
      </div>
    );
  }
}
