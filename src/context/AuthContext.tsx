import { createContext } from "react";
import { Auth, User } from "../interfaces";

const defaultAuth: Auth = {
  user: null,
  login: (token: string): User => {
    return { username: "", token, loginId: "", configId: "" };
  },
  logout: () => {},
};

const AuthContext = createContext<Auth>(defaultAuth);

export default AuthContext;