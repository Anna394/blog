const initialState = {
  articles: [],
  loading: false,
  error: null
};

const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_COMPLETE = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
const UPDATE_SINGLE_ARTICLE = 'UPDATE_SINGLE_ARTICLE';

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        articles: []
      };
    case FETCH_DATA_COMPLETE:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.error };
    case UPDATE_SINGLE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug ? action.payload : article
        )
      };
    default:
      return state;
  }
}

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataComplete = (data) => ({
  type: FETCH_DATA_COMPLETE,
  payload: data
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  error
});
export const fetchSingleArticle = (data) => ({
  type: UPDATE_SINGLE_ARTICLE,
  payload: data
});
