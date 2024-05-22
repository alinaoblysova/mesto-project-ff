export function renderLoading(isLoading, button, buttonText, loadingText) {
  if (isLoading) {
    button.textContent = loadingText;
  }
  else {
    button.textContent = buttonText;
  };
};

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  const evtIsNotButton = typeof evt === 'object';
  if (evtIsNotButton) {
    evt.preventDefault();
  };
  const submitButton = evtIsNotButton ? evt.submitter : evt;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      if (evtIsNotButton) {
        evt.target.reset();
      };
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
};