import { deletePopup, deletePopupButton } from './constants.js';
import { openModal, closeModal } from './modal.js';
import { deleteCard, updateLike } from './api.js';

let cardID;

export function createCard(initialCard, removeCallback, likeCallback, openCallback, userID) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton =  cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  likeCounter.textContent = initialCard.likes.length;
  cardImage.addEventListener('click', () => openCallback(cardImage, cardTitle));
  if (initialCard.owner._id === userID) {
    deleteButton.addEventListener('click', () => {
      cardID = initialCard._id;
      openModal(deletePopup);
      deletePopupButton.addEventListener('click', () => removeCallback(cardElement));
    });
  }
  else {
    deleteButton.setAttribute('disabled', true);
    deleteButton.setAttribute('style', 'display: none;');
  };
  if (initialCard.likes.some(like => like._id === userID)) {
    likeButton.classList.add('card__like-button_is-active');
  };
  likeButton.addEventListener('click', () => {
    cardID = initialCard._id;
    likeCallback(likeButton, likeCounter);
  });
  return cardElement;
};

export function removeCard(cardToBeRemoved) {
  deletePopupButton.textContent = "Удаление...";
  deleteCard(cardID)
    .then(() => {
      cardToBeRemoved.remove();
      closeModal(deletePopup);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      deletePopupButton.textContent = "Да";
    });
};

export function likeCard(buttonToBeChanged, counterToBeChanged) {
  const method = buttonToBeChanged.classList.contains("card__like-button_is-active")
    ? 'DELETE'
    : 'PUT'
  updateLike(cardID, method)
    .then(updatedCard => {
      buttonToBeChanged.classList.toggle('card__like-button_is-active');
      counterToBeChanged.textContent = updatedCard.likes.length;
    })
    .catch(error => {
      console.log(error);
    });
};