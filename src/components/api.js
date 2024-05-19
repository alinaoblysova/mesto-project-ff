const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '12cc5391-ba50-49b8-b813-21aaed4498e6',
    'Content-Type': 'application/json'
  },
};

const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  };
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(response => getResponseData(response));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(response => getResponseData(response));
};

export const updateUserData = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  })
    .then(response => getResponseData(response));
};

export const postCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })
    .then(response => getResponseData(response));
};

export const deleteCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(response => getResponseData(response));
};

export const updateLike = (cardID, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: method,
    headers: config.headers,
  })
    .then(response => getResponseData(response));
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then(response => getResponseData(response));
};