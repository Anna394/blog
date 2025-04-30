import { fetchEdit } from "../store/signReducer";

// Вспомогательная функция получения токена
function getToken() {
  try {
    const stored = localStorage.getItem("user");
    return JSON.parse(stored)?.user?.token || null;
  } catch {
    return null;
  }
}

export const fetchUpdate = (username, email, newpassword, image) => {
  return async (dispatch) => {
    const token = getToken();

    if (!token) {
      console.error("❌ Токен не найден. Пользователь не авторизован.");
      return;
    }

    const userData = {
      username,
      email,
      password: newpassword,
    };

    if (image) {
      userData.image = image;
    }

    try {
      const response = await fetch(
        "https://blog-platform.kata.academy/api/user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ user: userData }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // покажет ответ от сервера
        console.warn("❌ Ошибка от сервера:", errorText);

        console.log("📤 Отправленные данные:", userData, token);
        throw new Error(`Ошибка обновления пользователя: ${response.status}`);
      }

      const result = await response.json();
      dispatch(fetchEdit(result));
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error.message);
    }
  };
};
