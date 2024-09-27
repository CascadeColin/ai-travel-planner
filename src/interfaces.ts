export interface User {
  username: string | undefined;
  token: string;
  loginId: string;
  configId: string;
  // Add other user properties here
}

export interface Signup {
  username: string;
  password: string;
  name: string;
}

export interface Auth {
  user: User | null;
  login: (token: string) => User;
  logout: () => void;
  signup: (token: string) => Signup;
}

export interface AuthResponse {
  jwt_token: string;
  config_id: string;
}
