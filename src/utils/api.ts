import { TProfile, TUser } from "./typesData";
const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res:Response) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  });
}

export function getIngredients() {
  return fetch(`${baseUrl}/ingredients`).then(checkResponse);
}
const baseHeader = {
  'Content-Type': 'application/json'
}

const injectBearerToken = (baseHeader : Record<string, string>) : Record<string, string> => {
  const token = localStorage.getItem('accessToken')
 if (token) {
 return {
     ...baseHeader, 
       authorization: token,
     }
    }
 return baseHeader;
};

export function sendOrder<TResponseOrder>(ingredients: TResponseOrder) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then(checkResponse);
}


export function createUser(user: Omit<TUser, 'success'| 'user'>) {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name,
    }),
  })
    .then(checkResponse)
}
export function resetPassword(email:string) {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
}

export function authorization(profile: TProfile) {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: profile.email,
      password: profile.password,
    }),
  }).then(checkResponse);
}

export function getProfileInformation() {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: injectBearerToken(baseHeader)
  }).then(checkResponse);
}

export function resetToken() {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse);
}

export function changeProfileInformation(name: TUser, post: TUser): Promise<TUser> {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: injectBearerToken(baseHeader),
    body: JSON.stringify({
      name: name,
      email: post,
    }),
  }).then(checkResponse);
}

export function logOut() {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse);
}
