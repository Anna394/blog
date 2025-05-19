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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors
            ? JSON.stringify(errorData.errors)
            : 'Ошибка создания статьи'
        );
      }

      const data = await response.json();
      dispatch({ type: 'CREATE_ARTICLE_SUCCESS', payload: data.article });
    } catch (error) {
      dispatch({ type: 'CREATE_ARTICLE_FAILURE', payload: error.message });
    }
  };
};
