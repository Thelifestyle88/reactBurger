export const testUserData = {
  email: 'nikonikolaenko88@gmail.com',
  name: 'Nikolai',
};

export const testUrl = 'http://localhost:3000'

export const testOrder = {
createdAt: "2023-05-09T13:10:46.745Z",
ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093d'],
name: "Био-марсианский space люминесцентный флюоресцентный бургер",
number: 3441,
status: "done",
updatedAt: "2023-05-09T13:10:46.863Z",
_id: "645a46568a4b62001c835456",
};

export const testBun = {
calories: 420,
carbohydrates: 53,
fat: 24,
image: "https://code.s3.yandex.net/react/code/bun-02.png",
image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
name: "Краторная булка N-200i",
price: 1255,
proteins: 80,
type: "bun",
__v: 0,
_id: "643d69a5c3f7b9001cfa093c"
}

export const testSauce = {
calories: 30,
carbohydrates: 40,
fat: 20,
image: "https://code.s3.yandex.net/react/code/sauce-02.png",
image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
name: "Соус Spicy-X",
price: 90,
proteins: 30,
type: "sauce",
__v: 0,
_id: "643d69a5c3f7b9001cfa0942"
}

export const testMain = {
calories: 4242,
carbohydrates: 242,
fat: 142,
image: "https://code.s3.yandex.net/react/code/meat-01.png",
image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
name: "Биокотлета из марсианской Магнолии",
price: 424,
proteins: 420,
type: "main",
__v: 0,
_id: "643d69a5c3f7b9001cfa0941"
}

export const testOrderDetails = {
  success: true,
  order: {
    createdAt: "2023-05-11T14:25:28.240Z",
    ingredients: [testBun, testMain, testBun],
    name: "Space флюоресцентный бургер",
    number: 3715,
    owner: {
      createdAt: "2023-04-21T08:31:12.669Z",
      email: "nikonikolaenko88@gmail.com",
      name: "Nikolai",
      updatedAt: "2023-05-11T13:07:41.981Z"
    }
  },
    price: 2056,
    name: 'Space флюоресцентный бургер',
    status: "done",
    updatedAt: "2023-05-11T14:25:28.345Z",
    _id: "645cfad88a4b62001c83605c"
}

export const endPoints = {
  ingredients: '/ingredients',
  orders: '/orders',
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  read: '/auth/user',
  update: '/auth/user',
  forgot: '/password-reset',
  reset: '/password-reset/reset',
  token: '/auth/token'
}

export const baseUrl = 'https://norma.nomoreparties.space/api';