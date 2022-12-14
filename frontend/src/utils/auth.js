const BASE_URL = 'https://api.karinakudrik.mesto.nomoredomains.sbs';
//const BASE_URL = 'http://localhost:3001';

const checkResponse = (response) => {
   return response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`);
};

export const register = (password, email) => {
   return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
}).then(checkResponse);
};

export const autorize = (password, email) => {
   return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
}).then(checkResponse);
};

export const getContent = () => {
   return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
         authorization: "Bearer " + localStorage.getItem("jwt"),
   },
}).then(checkResponse);
};