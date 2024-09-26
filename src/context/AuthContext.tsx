import { createContext } from "react";
import { Auth, User } from "../interfaces";

const defaultAuth: Auth = {
  user: null,
  login: (token: string): User => {
    // Implement the login function to return a User object
    return { username: "", token }; // Example implementation
  },
  logout: () => {},
};

const AuthContext = createContext<Auth>(defaultAuth);

export default AuthContext;