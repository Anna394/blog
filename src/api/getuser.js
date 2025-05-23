import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../store/userReducer';

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());

    try {
      const token = JSON.parse(sessionStorage.getItem('user'))?.user?.token;

      if (!token) {
        throw new Error('Токен не найден в sessionStorage');
      }

      const response = await fetch(
        'https://blog-platform.kata.academy/api/user',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка получения данных пользователя: ${response.status}`
        );
      }

      const data = await response.json();
      dispatch(fetchUserSuccess(data.user));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};
