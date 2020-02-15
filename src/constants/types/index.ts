export type signUpInitialState = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type signInInitialState = {
  email: string;
  password: string;
};

export type PasswordForgetInitialState = {
  email: string;
};

export type PasswordUpdateInitialState = {
  password: string;
  passwordConfirm: string;
};
