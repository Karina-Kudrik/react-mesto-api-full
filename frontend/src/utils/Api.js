export default class Api {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
   }

   _handleError(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   getUserInfo() {
      return fetch(this._url + 'users/me', {
         method:'GET',
         headers: this._headers,
      }).then(this._handleError); 
   }

   getInitialCards() {
      return fetch(this._url + 'cards', {
         method:'GET',
         headers: this._headers
      }).then(this._handleError);
   }

   addCard(data) {
      return fetch(this._url + 'cards', {
         method:'POST',
         headers: this._headers,
         body:JSON.stringify(data),
      }).then(this._handleError); 
   }
   
   deleteCard(id) {
      return fetch(this._url + `cards/${id}`, {
         method:'DELETE',
         headers: this._headers,
      }).then(this._handleError); 
   }

   setUserInfo({name, about}) {
      return fetch(this._url + 'users/me', {
         method:'PATCH',
         headers: this._headers,
         body:JSON.stringify({name, about}),
      }).then(this._handleError); 
   }
   
   setLike(id) {
      return fetch(this._url + `cards/${id}/likes`, {
         method:'PUT',
         headers: this._headers
      }).then(this._handleError);
   }

   deleteLike(id) {
      return fetch(this._url + `cards/${id}/likes`, {
         method:'DELETE',
         headers: this._headers
      }).then(this._handleError);
   }

   changeLikeCardStatus(id, isLiked) {
      return fetch(this._url + `cards/${id}/likes`, {
         method: isLiked ? 'PUT' : 'DELETE',
         headers: this._headers
      }).then(this._handleError);
   }

   setUserAvatar(data) {
      return fetch(this._url + 'users/me/avatar', {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({avatar: data.avatar}),
      }).then(this._handleError); 
   }
}

export const api = new Api ({
   url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
   headers: {
   authorization: '096a8c76-d2e1-4c10-8591-a3bbd245b649',
      "Content-Type": "application/json"
   }
});
