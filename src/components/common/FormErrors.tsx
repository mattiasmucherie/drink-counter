import React from "react";
import { NestDataObject } from "react-hook-form";
import { signInInitialState } from "../../constants/types";
import "./style.scss";

export const FormErrors: React.FC<NestDataObject<
  signInInitialState
>> = errors => {
  let errorMessageEmail = "";
  let errorMessagePassword = "";
  let errorMessageFirebase = "";
  if (errors.email) {
    switch (errors.email.type) {
      case "required":
        errorMessageEmail = "Email is required";
        break;
      case "pattern":
        errorMessageEmail = "Not an email";
        break;
      default:
        errorMessageEmail = "Invalid email";
        break;
    }
  }
  if (errors.password) {
    switch (errors.password.type) {
      case "required":
        errorMessagePassword = "Password is required";
        break;
      case "pattern":
        errorMessagePassword =
          "Password needs min. 6 characters, 1 letter and 1 number";
        break;
      default:
        errorMessagePassword = "Invalid password";
    }
  }
  if (errors.firebase) {
    switch (errors.firebase.type) {
      case "auth/wrong-password":
      case "auth/user-not-found":
        errorMessageFirebase = "Wrong email or password";
        break;
      case "auth/user-disabled":
        errorMessageFirebase = "You have been banned";
        break;
      case "auth/too-many-requests":
        errorMessageFirebase = "Too many requests, try again later";
        break;
      default:
        errorMessageFirebase = "Could not connect to server";
    }
  }
  const returnMessage = (
    <div className="error-wrapper">
      {errorMessageEmail && <p>{errorMessageEmail}</p>}
      {errorMessagePassword && <p>{errorMessagePassword}</p>}
      {errorMessageFirebase && <p>{errorMessageFirebase}</p>}
    </div>
  );
  return returnMessage;
};
