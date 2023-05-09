import { TUser, TIngredient, TOrder } from './typesData';

export type THeader = {
    authorization: string
}

export type TMethod = 'GET' | 'PATCH' | 'POST';

export type TResponseIngredients = {
  success: boolean;
  data: Array<TIngredient>;
};

export type TResponseOrder = {
  success: boolean;
  name: string;
  order: {number:number};
}

export type TResponseTokens = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type TResponseUser = {
  success: boolean;
  user: TUser;
}

export type TResponseAuth = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
}

export type TResponseLogout = {
  success: boolean;
  message: string;
}

export type TResponseForgotPassword = {
  success: boolean;
  message: string;
}

export type TResponseResetPassword = {
  success: boolean;
  message: string;
}