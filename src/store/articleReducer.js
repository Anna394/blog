const CREATE_ARTICLE_REQUEST = "CREATE_ARTICLE_REQUEST";
const CREATE_ARTICLE_SUCCESS = "CREATE_ARTICLE_SUCCESS";
const CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE";
const DELETE_ARTICLE_SUCCESS = "DELETE_ARTICLE_SUCCESS";
const DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE";
const UPDATE_ARTICLE_SUCCESS = "UPDATE_ARTICLE_SUCCESS";
const UPDATE_ARTICLE_FAILURE = "UPDATE_ARTICLE_FAILURE";

const initialState = {
  loading: false,
  error: null,
  article: null,
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ARTICLE_SUCCESS:
      return { ...state, loading: false, article: action.payload };
    case CREATE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter((a) => a.slug !== action.payload),
      };

    case DELETE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug ? action.payload : article
        ),
        error: null,
      };

    case UPDATE_ARTICLE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const deleteArticleSuccess = (slug) => ({
  type: DELETE_ARTICLE_SUCCESS,
  payload: slug,
});
export const deleteArticleFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
});
