import React from "react";
const AuthUserContext = React.createContext<{
  authUser: firebase.User | null;
  loading: boolean;
}>({ authUser: null, loading: false });
export default AuthUserContext;
