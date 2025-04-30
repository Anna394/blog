import style from "./SignUp.module.scss";
import { fetchSignUp } from "../../api/signup";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, username, password } = data;
    dispatch(fetchSignUp(email, username, password));
    navigate("/");
  };

  const password = watch("password");

  return (
    <form className={style.signupform} onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
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
      <label>Repeat Password</label>
      <input
        className={errors.repeatPassword ? style.inputError : ""}
        type="password"
        placeholder="Password"
        {...register("repeatPassword", {
          required: "Repeat your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
      ></input>{" "}
      {errors.repeatPassword && (
        <div className={style.error}>{errors.repeatPassword.message}</div>
      )}
      <div className={style.checkbox}>
        <input
          className={errors.agree ? style.inputError : ""}
          type="checkbox"
          name="agree"
          {...register("agree", { required: "You must agree" })}
        />
        <label>I agree to the processing of my personal information</label>
        {errors.agree && (
          <div className={style.error}>{errors.agree.message}</div>
        )}
      </div>
      <button className={style.create} type="submit">
        Create
      </button>
      <div className={style.signIn}>
        Already have an account?
        <button> Sign In.</button>
      </div>
    </form>
  );
}

export default SignUp;
