const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
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

export function sendOrder(ingredients) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then(checkResponse);
}

export function createUser(user) {
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
    .then((res) => {
      console.log(res);
    });
}

export function resetPassword(email) {
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

export function authorization(profile) {
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
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
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

export function changeProfileInformation(name, post) {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
    body: {
      name: name,
      email: post,
    },
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
