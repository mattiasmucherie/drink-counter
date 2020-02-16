import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PasswordUpdateInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";
import { FormErrorsPassConfirm, FormErrors } from "../common/FormErrors";
import { passwordRegExp } from "../../constants/regexp";
import { Spinner } from "../spinner/spinner";

interface PasswordUpdateProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const PasswordUpdate: React.FC<PasswordUpdateProps> = props => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Update Password");
  const { register, handleSubmit, errors, watch, setValue } = useForm<
    PasswordUpdateInitialState
  >();
  const onSubmit = handleSubmit(async (data: PasswordUpdateInitialState) => {
    if (props.firebase) {
      setLoading(true);
      try {
        await props.firebase.doPasswordUpdate(data.password);
        setValue("password", "");
        setValue("passwordConfirm", "");
        setLoading(false);
        setTitle("Password updated!");
      } catch (err) {
        console.error(err);
        setValue("password", "");
        setValue("passwordConfirm", "");
        setLoading(false);
      }
    }
  });
  const isInvalid = !!errors.password || !!errors.passwordConfirm;
  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <input
          name="password"
          ref={register({ required: true, pattern: passwordRegExp })}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordConfirm"
          ref={register({ validate: value => value === watch("password") })}
          type="password"
          placeholder="Confirm Password"
        />
        <div className="error-wrapper">
          {isInvalid && FormErrors(errors) && FormErrorsPassConfirm(errors)}
        </div>
        <button disabled={isInvalid || loading} type="submit">
          {loading ? <Spinner /> : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default withFirebase(PasswordUpdate);
