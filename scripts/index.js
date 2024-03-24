// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__delete-button').addEventListener('click', evt => removeCard(evt.target));
  cardsContainer.append(cardElement);
}
// @todo: Функция удаления карточки
function removeCard(clickedButton) {
  const cardToBeRemoved = clickedButton.closest('.card');
  cardToBeRemoved.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => addCard(card.name, card.link));