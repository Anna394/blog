import {
  fetchLoginRequest,
  fetchLoginFailure,
  fetchLoginSuccess,
} from "../store/signReducer";

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest());

    try {
      const loginResponse = await fetch(
        "https://blog-platform.kata.academy/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password,
            },
          }),
        }
      );
      if (!loginResponse.ok) {
        throw new Error(
          `Ошибка получения loginResponse: ${loginResponse.status}`
        );
      }
      const loginData = await loginResponse.json();
      localStorage.setItem("user", JSON.stringify(loginData));

      dispatch(fetchLoginSuccess(loginData));
    } catch (error) {
      dispatch(fetchLoginFailure(error.message));
    }
  };
};
