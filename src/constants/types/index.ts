import { FieldError } from "react-hook-form";

export type signUpInitialState = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firebase?: FieldError;
};
export type createTeamInitialState = {
  teamName: string;
  usersEmail: { name: string }[];
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

export type Team = TeamFirebase & {
  id: string;
  total: number;
  timestamp?: { seconds: number; nanoseconds: number };
};

export type TeamFirebase = {
  name: string;
  owner: string;
  ownerId: string;
  usersEmail: string[];
  created?: any;
  users?: string[];
};
