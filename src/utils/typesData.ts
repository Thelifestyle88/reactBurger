export interface IUser {
  email: string;
  name: string
}

export type TUser = {
  email: string;
  name: string;
  success: boolean
  user: IUser
  password: string
}

export type TProfile = Omit<TUser, 'user' | 'name' | 'success'>

export type TIngredient = {
  carbohydrates: number;
  calories: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number,
  type: string;
  __v: number;
  _id: string;
  count: number;
  key: string;
  constructorId: string
}

export type TAllOrders = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number
}

export type TOrderDetails = {
  success: boolean;
  order: TMyOrderDetails
  name: string
}

export type TMyOrderDetails = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: IUser
  price: number
  status: string
  updatedAt: string
  _id: string
}

export type TOrder = {
  name: string;
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type THeaders = {
  authorization?: string;
  "Content-Type"?: string;
}

