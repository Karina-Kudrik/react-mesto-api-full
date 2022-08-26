const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (response) => {
   return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
}

export const register = (password, email) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
   })
      .then(checkResponse);
}

export const autorize = (password, email) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
   })
      .then(checkResponse);
}

export const getContent = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${token}`
      }
   })
      .then(checkResponse);
   }