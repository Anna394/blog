import {
  deleteArticleSuccess,
  deleteArticleFailure,
} from "../store/articleReducer"; // Замени на свой путь

export const deleteArticle = (slug) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.user?.token;

      if (!token) {
        throw new Error("Пользователь не авторизован");
      }

      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`https://blog-platform.kata.academy/api/articles/${slug}`);
      console.log(slug);

      if (!response.ok) {
        throw new Error(`Ошибка удаления: ${response.status}`);
      }

      dispatch(deleteArticleSuccess(slug)); // Можно передать slug, чтобы убрать из списка
    } catch (error) {
      dispatch(deleteArticleFailure(error.message));
    }
  };
};
