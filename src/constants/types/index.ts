import { FieldError } from "react-hook-form";

export type signUpInitialState = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type signInInitialState = {
  email: string;
  password: string;
  firebase?: FieldError;
};

export type PasswordForgetInitialState = {
  email: string;
};

export type PasswordUpdateInitialState = {
  password: string;
  passwordConfirm: string;
};
