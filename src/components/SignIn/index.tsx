import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";
import { signInInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";

const SignIn = () => (
  <div>
    <SignInForm />
  </div>
);
interface signInFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const SignInFormBase: React.FC<signInFormProps> = props => {
  const { register, handleSubmit, errors } = useForm<signInInitialState>();
  const onSubmit = handleSubmit((data: signInInitialState) => {
    if (props.firebase) {
      props.firebase
        .doSignInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          props.history.push(ROUTES.HOME);
        })
        .catch(err => console.log(err));
    }
  });
  const isInvalid = !!errors.email || !!errors.password;
  return (
    <form onSubmit={onSubmit}>
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
      {isInvalid && "Something was not correct"}
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
    </form>
  );
};

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;

export { SignInForm };
