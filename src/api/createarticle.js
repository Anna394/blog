export const createArticle = (articleData) => {
  return async (dispatch) => {
    dispatch({ type: 'CREATE_ARTICLE_REQUEST' });

    try {
      const token = JSON.parse(sessionStorage.getItem('user')).user.token;

      const response = await fetch(
        'https://blog-platform.kata.academy/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ article: articleData })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        return false;
      } else {
        dispatch({ type: 'CREATE_ARTICLE_SUCCESS', payload: result.article });
        return true;
      }
    } catch (error) {
      dispatch({ type: 'CREATE_ARTICLE_FAILURE', payload: error.message });
      console.error(error);
      return false;
    }
  };
};
