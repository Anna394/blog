import { fetchSingleArticle } from '../store/dataReducer';

export const setLike = (slug, isFavorited) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).user.token;

      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors
            ? JSON.stringify(errorData.errors)
            : 'Ошибка оценки статьи'
        );
      }

      const result = await response.json();
      dispatch(fetchSingleArticle(result.article));
    } catch (error) {
    }
  };
};
