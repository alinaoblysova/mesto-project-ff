// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(initialCard, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = initialCard.name;
  cardElement.querySelector('.card__image').src = initialCard.link;
  cardElement.querySelector('.card__image').alt = initialCard.alt;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(evt) {
  const cardToBeRemoved = evt.target.closest('.card');
  cardToBeRemoved.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(initialCard => {
  const card = createCard(initialCard, removeCard);
  cardsContainer.append(card);
});5