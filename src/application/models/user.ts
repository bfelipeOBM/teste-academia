export type User = {
  name: string;
  email: string;
  password: string;
  document?: string;
  phone: string;
  accept_receive_news: boolean;
  active?: boolean;
  role?: string;
  isLoggedIn?: boolean;
};

export type UserLogin = {
  email: string;
  password: string;
};
