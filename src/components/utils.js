export function getResponse (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
    if (isLoading) {
      button.textContent = loadingText
    } else {
      button.textContent = buttonText
    }
  }

  export function handleSubmit(request, evt, loadingText = "Сохранение...") {
   // всегда нужно предотвращать перезагрузку формы при сабмите
    evt.preventDefault();
  
    // универсально получаем кнопку сабмита из `evt`
    const submitButton = evt.submitter;
    // записываем начальный текст кнопки до вызова запроса
    const initialText = submitButton.textContent;
    // изменяем текст кнопки до вызова запроса
    renderLoading(true, submitButton, initialText, loadingText);
    request()
      .then(() => {
        // любую форму нужно очищать после успешного ответа от сервера
        // а так же `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
        evt.target.reset();
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }