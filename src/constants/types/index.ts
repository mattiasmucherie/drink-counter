import { FieldError } from "react-hook-form";

export type signUpInitialState = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firebase?: FieldError;
};

export type signInInitialState = {
  email: string;
  password: string;
  firebase?: FieldError;
};

export type PasswordForgetInitialState = {
  email: string;
  firebase?: FieldError;
};

export type PasswordUpdateInitialState = {
  password: string;
  passwordConfirm: string;
};
