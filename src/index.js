import './pages/index.css';
import { initialCards } from './components/cards.js';
import { cardsContainer, editButton, addButton, popups, editPopup, newCardPopup, imagePopup, imagePopupImage, imagePopupCaption, editForm, newCardForm, nameInput, descriptionInput, nameOutput, descriptionOutput} from './components/constants.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

function openImage(imageToBeOpened, cardTitle) {
  imagePopupImage.src = imageToBeOpened.src;
  imagePopupCaption.textContent = cardTitle.textContent;
  openModal(imagePopup);
};

initialCards.forEach(initialCard => {
  const card = createCard(initialCard, removeCard, likeCard, openImage);
  cardsContainer.append(card);
});

editButton.addEventListener('click', () => {
  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    };
  });
}); 

function submitEditForm(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closeModal(editPopup);
};

function submitNewCardForm(evt) {
  evt.preventDefault();
  const newCard = {};
  const placeInput = newCardForm.elements.place_name;
  const linkInput = newCardForm.elements.link;
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const card = createCard(newCard, removeCard, likeCard, openImage);
  cardsContainer.prepend(card);
  closeModal(newCardPopup);
  newCardForm.reset();
};

editForm.addEventListener('submit', submitEditForm); 
newCardForm.addEventListener('submit', submitNewCardForm);