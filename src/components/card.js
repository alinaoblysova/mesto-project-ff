export function createCard(initialCard, removeCallback, likeCallback, openCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton =  cardElement.querySelector('.card__like-button');
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.alt;
  cardTitle.textContent = initialCard.name;
  cardImage.addEventListener('click', () => openCallback(cardImage, cardTitle));
  deleteButton.addEventListener('click', () => removeCallback(cardElement));
  likeButton.addEventListener('click', () => likeCallback(likeButton));
  return cardElement;
};

export function removeCard(cardToBeRemoved) {
  cardToBeRemoved.remove();
};

export function likeCard(buttonToBeChanged) {
  buttonToBeChanged.classList.toggle('card__like-button_is-active');
};