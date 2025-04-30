export const updateArticle = (slug, articleData) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).user.token;

      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ article: articleData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors
            ? JSON.stringify(errorData.errors)
            : "Ошибка обновления статьи"
        );
      }

      const result = await response.json();
      dispatch({ type: "UPDATE_ARTICLE_SUCCESS", payload: result.article });
    } catch (error) {
      dispatch({ type: "UPDATE_ARTICLE_FAILURE", payload: error.message });
    }
  };
};
