import './pages/index.css';
import { profileImage, cardsContainer, editButton, addButton, avatarButton, popups, editPopup, newCardPopup, imagePopup, avatarPopup, editPopupButton, newCardPopupButton, avatarPopupButton, imagePopupImage, imagePopupCaption, editForm, newCardForm, avatarForm, nameInput, descriptionInput, nameOutput, descriptionOutput} from './components/constants.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getInitialCards, updateUserData, postCard, updateAvatar } from './components/api.js';

let userID;

function openImage(imageToBeOpened, cardTitle) {
  imagePopupImage.src = imageToBeOpened.src;
  imagePopupCaption.textContent = cardTitle.textContent;
  openModal(imagePopup);
};

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  };
};

Promise.all([getUserData(), getInitialCards()])
  .then(results => {
    const userData = results[0];
    const initialCards = results[1];
    userID = userData._id;
    nameOutput.textContent = userData.name;
    descriptionOutput.textContent = userData.about;
    profileImage.setAttribute('style', `background-image: url('${userData.avatar}');`);
    initialCards.forEach(initialCard => {
      const card = createCard(initialCard, removeCard, likeCard, openImage, userID);
      cardsContainer.append(card);
    });
  })
  .catch(error => {
    console.log(error);
  });

editButton.addEventListener('click', () => {
  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

avatarButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup)
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
  renderLoading(true, editPopupButton);
  updateUserData(nameInput.value, descriptionInput.value)
    .then(userData => {
      nameOutput.textContent = userData.name;
      descriptionOutput.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, editPopupButton);
    });
};

function submitNewCardForm(evt) {
  evt.preventDefault();
  const placeInput = newCardForm.elements.place_name;
  const linkInput = newCardForm.elements.link;
  renderLoading(true, newCardPopupButton);
  postCard(placeInput.value, linkInput.value)
    .then(newCard => {
      const card = createCard(newCard, removeCard, likeCard, openImage, userID);
      cardsContainer.prepend(card);
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, newCardPopupButton);
    });
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  const avatarInput = avatarForm.elements.avatar;
  renderLoading(true, avatarPopupButton);
  updateAvatar(avatarInput.value)
    .then(updatedUserData => {
      profileImage.setAttribute('style', `background-image: url('${updatedUserData.avatar}');`);
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, avatarPopupButton);
    });
};

editForm.addEventListener('submit', submitEditForm); 
newCardForm.addEventListener('submit', submitNewCardForm);
avatarForm.addEventListener('submit', submitAvatarForm);

enableValidation(validationConfig);