import style from "../SighUp/SignUp.module.scss";
import { fetchUpdate } from "../../api/updateuser";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, username, password, image } = data;
    dispatch(fetchUpdate(username, email, password, image));
    navigate("/");
  };

  return (
    <form className={style.signupform} onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>
      <label>Username</label>
      <input
        className={errors.username ? style.inputError : ""}
        type="text"
        placeholder="Username"
        {...register("username", {
          required: "Username is required",
          minLength: { value: 3, message: "Minimum 3 characters" },
          maxLength: { value: 20, message: "Maximum 20 characters" },
        })}
      ></input>
      {errors.username && (
        <div className={style.error}>{errors.username.message}</div>
      )}
      <label>Email address</label>
      <input
        className={errors.email ? style.inputError : ""}
        type="email"
        placeholder="Email address"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
      ></input>
      {errors.email && (
        <div className={style.error}>{errors.email.message}</div>
      )}
      <label>New password</label>
      <input
        className={errors.password ? style.inputError : ""}
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
          maxLength: { value: 40, message: "Max 40 characters" },
        })}
      ></input>
      {errors.password && (
        <div className={style.error}>{errors.password.message}</div>
      )}
      <label>Avatar image (url)</label>
      <input placeholder="Image"></input>
      <button className={style.create} type="submit">
        Save
      </button>
    </form>
  );
}

export default UpdateUser;
