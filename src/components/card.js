import { cardTemplate, deletePopup, deletePopupButton } from './constants.js';
import { openModal, closeModal } from './modal.js';
import { deleteCard, updateLike } from './api.js';

let cardID, cardDeleteButton;

export function createCard(parameters) {
  // parameters constants
  const initialCard = parameters.card;
  const openCallback = parameters.openImage;
  const removeCallback = parameters.removeCard;
  const likeCallback = parameters.likeCard;
  const userID = parameters.userID;
  // element constants
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton =  cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  // initialCard usage
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  likeCounter.textContent = initialCard.likes.length;
  // openCallback usage
  cardImage.addEventListener('click', () => openCallback(cardImage, cardTitle));
  // removeCallback usage
  if (initialCard.owner._id === userID) {
    deleteButton.addEventListener('click', () => {
      cardID = initialCard._id;
      cardDeleteButton = deleteButton;
      openModal(deletePopup);
      deletePopupButton.addEventListener('click', removeCallback);
    });
  }
  else {
    deleteButton.setAttribute('disabled', true);
    deleteButton.setAttribute('style', 'display: none;');
  };
  // likeCallback usage
  if (initialCard.likes.some(like => like._id === userID)) {
    likeButton.classList.add('card__like-button_is-active');
  };
  likeButton.addEventListener('click', () => {
    cardID = initialCard._id;
    likeCallback(likeButton, likeCounter);
  });
  // return
  return cardElement;
};

export function removeCard(evt) {
  deletePopupButton.textContent = "Удаление...";
  deleteCard(cardID)
    .then(() => {
      const cardToBeRemoved = cardDeleteButton.closest('.card');
      cardToBeRemoved.remove();
      closeModal(deletePopup);
    })
    .catch(console.error)
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
    .catch(console.error);
};