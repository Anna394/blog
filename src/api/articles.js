import {
  fetchDataRequest,
  fetchDataComplete,
  fetchDataFailure,
} from "../store/dataReducer";

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const articleResponse = await fetch(
        "https://blog-platform.kata.academy/api/articles"
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
