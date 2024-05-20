import './pages/index.css';
import { profileImage, cardsContainer, editButton, addButton, avatarButton, popups, editPopup, newCardPopup, imagePopup, avatarPopup, imagePopupImage, imagePopupCaption, editForm, newCardForm, avatarForm, nameInput, descriptionInput, nameOutput, descriptionOutput} from './components/constants.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getInitialCards, updateUserData, postCard, updateAvatar } from './components/api.js';

let userID;

function openImage(imageToBeOpened, cardTitle) {
  imagePopupImage.src = imageToBeOpened.src;
  imagePopupImage.alt = cardTitle.textContent;
  imagePopupCaption.textContent = cardTitle.textContent;
  openModal(imagePopup);
};

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  };
};

function renderCard(card, method = 'prepend') {
  const parameters = {card, removeCard, likeCard, openImage, userID};
  const cardElement = createCard(parameters);
  cardsContainer[method](cardElement);
}

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userID = userData._id;
    nameOutput.textContent = userData.name;
    descriptionOutput.textContent = userData.about;
    profileImage.setAttribute('style', `background-image: url('${userData.avatar}');`);
    initialCards.forEach(initialCard => {
      renderCard(initialCard, 'append')
    });
  })
  .catch(console.error);

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
  renderLoading(true, evt.submitter); // слишком сложно, может, когда-нибудь я смогу это разобрать... в любом случае, спасибо, так выглядит гораздо лаконичней
  updateUserData(nameInput.value, descriptionInput.value)
    .then(userData => {
      nameOutput.textContent = userData.name;
      descriptionOutput.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

function submitNewCardForm(evt) {
  evt.preventDefault();
  const placeInput = newCardForm.elements.place_name;
  const linkInput = newCardForm.elements.link;
  renderLoading(true, evt.submitter);
  postCard(placeInput.value, linkInput.value)
    .then(newCard => {
      renderCard(newCard);
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  const avatarInput = avatarForm.elements.avatar;
  renderLoading(true, evt.submitter);
  updateAvatar(avatarInput.value)
    .then(updatedUserData => {
      profileImage.setAttribute('style', `background-image: url('${updatedUserData.avatar}');`);
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

editForm.addEventListener('submit', submitEditForm); 
newCardForm.addEventListener('submit', submitNewCardForm);
avatarForm.addEventListener('submit', submitAvatarForm);

enableValidation(validationConfig);