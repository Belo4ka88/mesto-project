
//Проверяет валидность полей
export const hasInvalidInput = (inputList, settings) => {
    return inputList.some((inputElement) => {
      if(inputElement.value.length === 0) return true;
      return inputElement.classList.contains(settings.popupInputError)
    });
  };

//Функция, показывающая ошибку
export  const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
    inputElement.classList.add(settings.popupInputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.popupInputMessageVisible);
  };

//Функция, скрывающая ошибку
export const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
    inputElement.classList.remove(settings.popupInputError);
    errorElement.classList.remove(settings.popupInputMessageVisible);
  };  

//Проверка на валидность
const isValid = (formElement, inputElement, settings) => {
  if(inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessage, settings);
  }
    else if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  //Функция включения/выключения кнопки
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList, settings)) {
      buttonElement.classList.remove(settings.popupSaveButtonActive);
      buttonElement.classList.add(settings.popupSaveButtonDisabled);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.add(settings.popupSaveButtonActive);
      buttonElement.classList.remove(settings.popupSaveButtonDisabled);
      buttonElement.removeAttribute('disabled');
    }
  };
  
  
  //Добавить слушатели
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.popupInput));
    const buttonElement = formElement.querySelector(settings.popupSaveButton);
    toggleButtonState(inputList, buttonElement, settings);
    formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        toggleButtonState(inputList, buttonElement, settings);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
    });
  });
  };
  
  export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.popupForm));
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  };