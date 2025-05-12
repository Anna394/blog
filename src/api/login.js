import {
  fetchLoginRequest,
  fetchLoginFailure,
  fetchLoginSuccess
} from '../store/signReducer';

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest());

    try {
      const loginResponse = await fetch(
        'https://blog-platform.kata.academy/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password
            }
          })
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        dispatch(
          fetchLoginFailure(
            loginData.errors || { message: 'Неизвестная ошибка' }
          )
        );
        return false;
      } else {
        dispatch(fetchLoginFailure(null));
        dispatch(fetchLoginSuccess(loginData));
        localStorage.setItem('user', JSON.stringify(loginData));

        return true;
      }
    } catch (error) {
      dispatch(fetchLoginFailure({ message: error }));
      return false;
    }
  };
};
