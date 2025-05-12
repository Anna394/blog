import {
  fetchDataRequest,
  fetchDataComplete,
  fetchDataFailure
} from '../store/dataReducer';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const tokenData = localStorage.getItem('user');
      const token = tokenData ? JSON.parse(tokenData).user.token : null;

      const articleResponse = await fetch(
        'https://blog-platform.kata.academy/api/articles',
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

      dispatch(fetchDataComplete(articleData.articles));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
