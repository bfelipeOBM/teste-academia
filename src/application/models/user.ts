export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  document?: string;
  phone: string;
  accept_receive_news?: boolean;
  active?: boolean;
  role?: string;
  occupation?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type AccessToken = {
  access_token: string;
  refresh_token: string;
};
