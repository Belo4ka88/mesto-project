

  //Проверяет валидность полей
export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      if(inputElement.value.length === 0) return true;
      return inputElement.classList.contains('popup__input-field_error')
    });
  };
  //Функция, показывающая ошибку
 export  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
    inputElement.classList.add('popup__input-field_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-message_visible');
  };
  //Функция, скрывающая ошибку
 export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
    inputElement.classList.remove('popup__input-field_error');
    errorElement.classList.remove('popup__input-message_visible');
  };  

    
  
  //Проверка на валидность
  const isValid = (formElement, inputElement) => {
    if(inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage);
    }
    else if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  //Функция включения/выключения кнопки
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.remove('popup__save-button_active');
      buttonElement.classList.add('popup__save-button_disabled');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.add('popup__save-button_active');
      buttonElement.classList.remove('popup__save-button_disabled');
      buttonElement.removeAttribute('disabled');
    }
  };
  
  
  //Добавить слушатели
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
    });
  });
  };
  
  export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };