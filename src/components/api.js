const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
    headers: {
      authorization: '189ba188-4e08-47fa-b661-1a41b634616c',
      'Content-Type': 'application/json',
    }
  }

import { getResponse } from "./utils";


export function deletePlace(cardId) {
    return fetch( `${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getResponse);
  }

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
  }).then(res => getResponse(res));  
  }
  
export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  }).then(res => getResponse(res));  
  }

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      }).then(res => getResponse(res));  
}


export function submitProfileForm(nameInput, jobInput) {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
  })
}).then(res => getResponse(res));  
}


export function submitPlaceForm(namePlaceInput, imageInput) {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: namePlaceInput.value,
        link: imageInput.value
  })
}).then(res => getResponse(res));  
}

export function changeAvatar(avatarInput) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarInput.value,
    })}).then(res => getResponse(res)); 
}

export function renderProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        }).then(res => getResponse(res));  
    }