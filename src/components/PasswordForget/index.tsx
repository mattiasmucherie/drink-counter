import React, { useState } from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PasswordForgetInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import "../../style/formStyle.scss";
import "./style.scss";
import { emailRegExp } from "../../constants/regexp";
import { FormErrors } from "../common/FormErrors";
import { Spinner } from "../spinner/spinner";

const PasswordForget = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
interface PasswordForgetFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const PasswordForgetFormBase: React.FC<PasswordForgetFormProps> = props => {
  const [title, setTitle] = useState("Reset password");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError
  } = useForm<PasswordForgetInitialState>();
  const onSubmit = handleSubmit((data: PasswordForgetInitialState) => {
    if (props.firebase) {
      setLoading(true);
      props.firebase
        .doPasswordReset(data.email)
        .then(() => {
          setValue("email", "");
          setLoading(false);
          setTitle("Check your email!");
        })
        .catch(err => {
          setValue("email", "");
          setError("firebase", err.code, err.message);
          console.error(err);
          setLoading(false);
        });
    }
  });
  const isInvalid = !!errors.email || !!errors.firebase;
  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <input
          name="email"
          ref={register({ required: true, pattern: emailRegExp })}
          type="email"
          placeholder="Email Address"
          onChange={() => clearError("firebase")}
        />
        <div className="error-wrapper">{isInvalid && FormErrors(errors)}</div>
        <button disabled={loading || isInvalid} type="submit">
          {loading ? <Spinner /> : "Reset My password"}
        </button>
      </form>
    </div>
  );
};

const PasswordForgetLink = () => (
  <p className="password-forget-link">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
