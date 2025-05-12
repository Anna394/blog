const initialArticleState = {
  article: null,
  loading: false,
  error: null
};

const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';
const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';
const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export function articleReducer(state = initialArticleState, action) {
  switch (action.type) {
    case CREATE_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_ARTICLE_SUCCESS:
      return { ...state, loading: false, article: action.payload };

    case CREATE_ARTICLE_FAILURE:
    case UPDATE_ARTICLE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_ARTICLE_SUCCESS:
      return { ...state, article: action.payload, error: null };

    case DELETE_ARTICLE_SUCCESS:
      return { ...state, article: null, loading: false };

    default:
      return state;
  }
}

export const createArticleRequest = () => ({ type: CREATE_ARTICLE_REQUEST });
export const createArticleSuccess = (data) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: data
});
export const createArticleFailure = (error) => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: error
});

export const updateArticleSuccess = (data) => ({
  type: UPDATE_ARTICLE_SUCCESS,
  payload: data
});
export const updateArticleFailure = (error) => ({
  type: UPDATE_ARTICLE_FAILURE,
  payload: error
});

export const deleteArticleSuccess = () => ({ type: DELETE_ARTICLE_SUCCESS });
export const deleteArticleFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error
});
