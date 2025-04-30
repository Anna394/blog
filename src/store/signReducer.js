const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  errors: null,
};

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const LOGOUT = "LOGOUT";
const EDIT = "EDIT";

export function signReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case EDIT:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}

export const fetchLoginRequest = () => ({ type: LOGIN_REQUEST });
export const fetchRegisterRequest = () => ({ type: REGISTER_REQUEST });

export const fetchLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
export const fetchRegisterSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const fetchLoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const fetchRegisterFailure = (error) => ({
  type: REGISTER_FAILURE,
  error,
});

export const fetchLogout = () => ({ type: LOGOUT });

export const fetchEdit = () => ({ type: EDIT });
