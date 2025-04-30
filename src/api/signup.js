import {
  fetchRegisterRequest,
  fetchRegisterSuccess,
  fetchRegisterFailure,
} from "../store/signReducer";

export const fetchSignUp = (email, username, password) => {
  return async (dispatch) => {
    dispatch(fetchRegisterRequest());

    try {
      const signUpResponse = await fetch(
        "https://blog-platform.kata.academy/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: username,
              email: email,
              password: password,
            },
          }),
        }
      );
      if (!signUpResponse.ok) {
        throw new Error(
          `Ошибка получения signUpResponse : ${signUpResponse.status}`
        );
      }
      const signUpData = await signUpResponse.json();
      console.log(signUpData);

      dispatch(fetchRegisterSuccess(signUpData));
    } catch (error) {
      dispatch(fetchRegisterFailure(error.message));
      console.log(error.message);
    }
  };
};
