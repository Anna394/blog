import {
  fetchRegisterRequest,
  fetchRegisterSuccess,
  fetchRegisterFailure
} from '../store/signReducer';

export const fetchSignUp = (email, username, password) => {
  return async (dispatch) => {
    dispatch(fetchRegisterRequest());

    try {
      const response = await fetch(
        'https://blog-platform.kata.academy/api/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { username, email, password } })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        dispatch(
          fetchRegisterFailure(
            result.errors || { message: 'Неизвестная ошибка' }
          )
        );
        return false;
      } else {
        dispatch(fetchRegisterFailure(null));
        dispatch(fetchRegisterSuccess(result.user));
        sessionStorage.setItem('user', JSON.stringify(result));
        return true;
      }
    } catch (err) {
      dispatch(fetchRegisterFailure({ message: err }));
      console.error(err);
      return false;
    }
  };
};
