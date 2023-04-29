export interface IUser {
  email?: string;
  name?: string
}

export type TUser = {
    email?: string;
    name?: string;
    success:boolean
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