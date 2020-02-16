import React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PasswordForgetInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import "../../style/formStyle.scss";
import "./style.scss";

const PasswordForget = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
interface PasswordForgetFormProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const PasswordForgetFormBase: React.FC<PasswordForgetFormProps> = props => {
  const { register, handleSubmit, errors, setValue } = useForm<
    PasswordForgetInitialState
  >();
  const onSubmit = handleSubmit((data: PasswordForgetInitialState) => {
    if (props.firebase) {
      props.firebase
        .doPasswordReset(data.email)
        .then(() => {
          setValue("email", "");
        })
        .catch(err => {
          setValue("email", "");
          console.log(err);
        });
    }
  });
  const isInvalid = !!errors.email;
  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit}>
        <h2>Reset password</h2>
        <input
          name="email"
          ref={register}
          type="email"
          placeholder="Email Address"
        />
        {isInvalid && "Something was not correct"}
        <button disabled={isInvalid} type="submit">
          Reset My password
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
