import {
  fetchDataRequest,
  fetchDataComplete,
  fetchDataFailure
} from '../store/dataReducer';

export const fetchData = (page = 1, limit = 5) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    const offset = (page - 1) * limit;

    try {
      const tokenData = localStorage.getItem('user');
      const token = tokenData ? JSON.parse(tokenData).user.token : null;

      const articleResponse = await fetch(
        `https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      if (!articleResponse.ok) {
        throw new Error(
          `Ошибка получения articleResponse : ${articleResponse.status}`
        );
      }
      const articleData = await articleResponse.json();

      dispatch(
        fetchDataComplete(articleData.articles, articleData.articlesCount)
      );
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
