import React, { useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";
import { signUpInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";
import "../../style/formStyle.scss";
import "./style.scss";
import { Spinner } from "../spinner/spinner";
import { emailRegExp, passwordRegExp } from "../../constants/regexp";
import { FormErrors, FormErrorsPassConfirm } from "../common/FormErrors";

const SignUp = () => <SignUpForm />;
interface signUpFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const SignUpFormBase: React.FC<signUpFormProps> = props => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setError,
    clearError
  } = useForm<signUpInitialState>();
  const onSubmit = handleSubmit(async (data: signUpInitialState) => {
    const { username, email, password } = data;
    if (props.firebase) {
      setLoading(true);
      try {
        const authUser = await props.firebase.doCreateUserWithEmailAndPassword(
          email,
          password
        );
        if (authUser.user) {
          await props.firebase.user(authUser.user.uid).set({ username, email });
        }
        setLoading(false);
        props.history.push(ROUTES.HOME);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("firebase", err.code, err.message);
      }
    }
  });
  const isInvalid =
    !!errors.username ||
    !!errors.email ||
    !!errors.password ||
    !!errors.passwordConfirm ||
    !!errors.firebase;

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <input
          name="username"
          ref={register}
          type="text"
          placeholder="Your name"
          onChange={() => clearError("firebase")}
        />
        <input
          name="email"
          ref={register({ required: true, pattern: emailRegExp })}
          type="email"
          placeholder="Email Address"
          onChange={() => clearError("firebase")}
        />
        <input
          name="password"
          ref={register({ required: true, pattern: passwordRegExp })}
          type="password"
          placeholder="Password"
          onChange={() => clearError("firebase")}
        />
        <input
          name="passwordConfirm"
          ref={register({ validate: value => value === watch("password") })}
          type="password"
          placeholder="Confirm Password"
          onChange={() => clearError("firebase")}
        />
        <div className="error-wrapper">
          {isInvalid && FormErrors(errors) && FormErrorsPassConfirm(errors)}
        </div>
        <button disabled={isInvalid || loading} type="submit">
          {loading ? <Spinner /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
const SignUpLink = () => (
  <p className="sign-up-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm, SignUpLink };
