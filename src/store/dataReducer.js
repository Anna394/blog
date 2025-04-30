const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_COMPLETE = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        articles: [],
      };
    case FETCH_DATA_COMPLETE:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        loading: false,
      };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataComplete = (data) => ({
  type: FETCH_DATA_COMPLETE,
  payload: data,
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  error,
});
