import style from "../SighUp/SignUp.module.scss";
import { fetchLogin } from "../../api/login";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(fetchLogin(email, password));
    navigate("/");
  };

  return (
    <form className={style.signupform} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
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
      <label>Password</label>
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
      <button className={style.create} type="submit">
        Login
      </button>
      <div className={style.signIn}>
        Don’t have an account?
        <button> Sign Up. </button>
      </div>
    </form>
  );
}

export default Login;
