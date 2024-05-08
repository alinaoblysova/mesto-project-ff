import './pages/index.css';
import { initialCards, createCard, removeCard, likeCard } from './components/cards.js'
import { openModal, closeModal } from './components/modal.js'

const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openImage(evt) {
  openModal(imagePopup, closeModal);
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
}

initialCards.forEach(initialCard => {
  const card = createCard(initialCard, removeCard, likeCard, openImage);
  cardsContainer.append(card);
});

editButton.addEventListener('click', () => {
  openModal(editPopup, closeModal);
});

addButton.addEventListener('click', () => {
  openModal(newCardPopup, closeModal);
});

const editForm = document.forms.edit_profile;
const newCardForm = document.forms.new_place;

const nameInput = editForm.elements.name;
const descriptionInput = editForm.elements.description;

const nameOutput = document.querySelector('.profile__title');
const descriptionOutput = document.querySelector('.profile__description');

nameInput.value = nameOutput.textContent;
descriptionInput.value = descriptionOutput.textContent;

function submitEditForm(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  evt.target.closest('.popup').classList.toggle('popup_is-opened');
}

function submitNewCardForm(evt) {
  evt.preventDefault();
  const newCard = {};
  const placeInput = newCardForm.elements.place_name;
  const linkInput = newCardForm.elements.link;
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const card = createCard(newCard, removeCard, likeCard, openCard);
  cardsContainer.prepend(card);
  evt.target.closest('.popup').classList.toggle('popup_is-opened');
  newCardForm.reset();
}

editForm.addEventListener('submit', submitEditForm); 
newCardForm.addEventListener('submit', submitNewCardForm);