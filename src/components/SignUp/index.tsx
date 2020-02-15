import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";
import { signUpInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";

const SignUp = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
interface signUpFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const SignUpFormBase: React.FC<signUpFormProps> = props => {
  const { register, handleSubmit, errors, watch } = useForm<
    signUpInitialState
  >();
  const onSubmit = handleSubmit(async (data: signUpInitialState) => {
    const { username, email, password } = data;
    if (props.firebase) {
      try {
        const authUser = await props.firebase.doCreateUserWithEmailAndPassword(
          email,
          password
        );
        if (authUser.user) {
          await props.firebase.user(authUser.user.uid).set({ username, email });
        }
        props.history.push(ROUTES.HOME);
      } catch (err) {
        console.log(err);
      }
    }
  });
  const isInvalid =
    !!errors.username ||
    !!errors.email ||
    !!errors.password ||
    !!errors.passwordConfirm;
  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        ref={register}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        ref={register}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        ref={register}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordConfirm"
        ref={register({ validate: value => value === watch("password") })}
        type="password"
        placeholder="Confirm Password"
      />
      {isInvalid && "Something was not correct"}
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
    </form>
  );
};
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm, SignUpLink };
