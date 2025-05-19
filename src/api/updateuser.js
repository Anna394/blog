import { fetchEdit, fetchEditFailure } from '../store/signReducer';
import { fetchUserSuccess } from '../store/userReducer';

export const fetchUpdate = (username, email, newpassword, image) => {
  return async (dispatch) => {
    const userData = {
      username,
      email
    };

    if (newpassword) {
      userData.password = newpassword;
    }

    if (image) {
      userData.image = image;
    }

    try {
      const token = JSON.parse(sessionStorage.getItem('user')).user.token;

      const response = await fetch(
        'https://blog-platform.kata.academy/api/user',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({ user: userData })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        dispatch(
          fetchEditFailure(result.errors || { message: 'Неизвестная ошибка' })
        );
        return false;
      } else {
        dispatch(fetchEdit(result.user));
        dispatch(fetchEditFailure(null));
        dispatch(fetchUserSuccess(result.user));
        return true;
      }
    } catch (error) {
      dispatch(fetchEditFailure({ message: error }));
      console.error(error);
      return false;
    }
  };
};
