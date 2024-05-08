export function openModal(modal, closeCallback) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', closeCallback);
  document.addEventListener('keydown', closeCallback);
};

export function closeModal(evt) {
  const targetPopup = document.querySelector('.popup_is-opened');
  const targetClasses = evt.target.classList;
  if (targetClasses.contains('popup__close') || targetClasses.contains('popup') || evt.key === 'Escape') {
    targetPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModal);
  };
};