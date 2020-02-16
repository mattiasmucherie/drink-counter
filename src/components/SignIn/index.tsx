import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";
import { signInInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";
import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import "../../style/formStyle.scss";
import { emailRegExp, passwordRegExp } from "../../constants/regexp";
import { FormErrors } from "../common/FormErrors";
import { FirebaseError } from "firebase";
import { Spinner } from "../spinner/spinner";

const SignIn = () => (
  <div>
    <SignInForm />
  </div>
);
interface signInFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const SignInFormBase: React.FC<signInFormProps> = props => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setError, clearError } = useForm<
    signInInitialState
  >();
  const onSubmit = handleSubmit((data: signInInitialState) => {
    if (props.firebase) {
      setLoading(true);
      props.firebase
        .doSignInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          setLoading(false);
          props.history.push(ROUTES.HOME);
        })
        .catch((err: FirebaseError) => {
          setError("firebase", err.code, err.message);
          setLoading(false);
          console.error(err);
        });
    }
  });
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await props.firebase?.doSignInWithGoogle();
      setLoading(false);
      props.history.push(ROUTES.HOME);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const isInvalid = !!errors.email || !!errors.password || !!errors.firebase;
  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit} className="form">
        <h2>Sign In</h2>
        <input
          name="email"
          ref={register({ required: true, pattern: emailRegExp })}
          type="text"
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
        {isInvalid && FormErrors(errors)}
        <button disabled={isInvalid || loading} type="submit">
          {loading ? <Spinner /> : "Sign In"}
        </button>
        <button disabled={loading} onClick={signInWithGoogle}>
          {loading ? <Spinner /> : <i className="fab fa-google"></i>}
        </button>
        <PasswordForgetLink />
        <SignUpLink />
      </form>
    </div>
  );
};

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;

export { SignInForm };
