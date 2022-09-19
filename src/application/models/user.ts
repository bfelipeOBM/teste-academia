export type User = {
  access_token?: string;
  id?: number;
  name: string;
  email: string;
  password: string;
  document?: string;
  phone: string;
  accept_receive_news: boolean;
  active?: boolean;
  role?: string;
  isLoggedIn?: boolean;
  occupation?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
