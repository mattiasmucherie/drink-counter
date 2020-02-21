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

export type TeamType = TeamFirebase & {
  id: string;
  total: number;
  timestamp?: timestamp;
};
export type timestamp = {
  seconds: number;
  nanoseconds: number;
};
export type TeamFirebase = {
  name: string;
  owner: string;
  createdAt: firebase.firestore.Timestamp;
  total: number;
  users: string[];
};

export type userDrinkInfo = {
  id: string;
  logs: logType[];
  total: number;
};

export type logType = {
  amount: number;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
};
