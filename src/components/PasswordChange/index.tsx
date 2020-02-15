import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PasswordUpdateInitialState } from "../../constants/types";
import Firebase, { withFirebase } from "../Firebase";

interface PasswordUpdateProps extends RouteComponentProps {
  firebase: Firebase | null;
}
const PasswordUpdate: React.FC<PasswordUpdateProps> = props => {
  const { register, handleSubmit, errors, watch, setValue } = useForm<
    PasswordUpdateInitialState
  >();
  const onSubmit = handleSubmit(async (data: PasswordUpdateInitialState) => {
    if (props.firebase) {
      try {
        await props.firebase.doPasswordUpdate(data.password);
        setValue("password", "");
        setValue("passwordConfirm", "");
      } catch (err) {
        console.log(err);
        setValue("password", "");
        setValue("passwordConfirm", "");
      }
    }
  });
  const isInvalid = !!errors.password;
  return (
    <form onSubmit={onSubmit}>
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

export default withFirebase(PasswordUpdate);
