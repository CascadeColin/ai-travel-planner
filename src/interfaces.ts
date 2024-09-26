export interface User {
  username: string | undefined;
  token: string;
  // Add other user properties here
}

export interface Auth {
    user: User | null;
    login: (token: string) => User;
    logout: () => void;
}