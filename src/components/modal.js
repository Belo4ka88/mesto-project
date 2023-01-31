import { handleSubmit } from './utils.js';
import { avatarEdit, avatarForm, popupAvatar, nameInput, occupationInput, profileName, occupationName, popupProfile, avatarValue, settings  } from './constants.js';
import { submitProfileForm, changeAvatar } from './api.js';




// Открывает Попап
export function openPopup (element) {
      element.classList.add('popup_opened');
      document.addEventListener('keydown', closeByEscape);
}

//Закрывает Попап
export function closePopup (element) {
      element.classList.remove('popup_opened');
      document.removeEventListener('keydown', closeByEscape);
      }

export function closeByEscape(evt) {
        if (evt.key === 'Escape') {
          const openedPopup = document.querySelector('.popup_opened');
          if(openedPopup) closePopup(openedPopup);
        }
}


// пример оптимизации обработчика сабмита формы профиля
export function handleProfileFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return submitProfileForm(nameInput, occupationInput).then((userData) => {
      profileName.textContent = userData.name;
      occupationName.textContent = userData.about;
      closePopup(popupProfile);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// пример оптимизации обработчика сабмита формы профиля аватара
export function handleProfileAvatarFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return changeAvatar(avatarValue).then((userData) => {
      avatarEdit.style.backgroundImage = `url(${avatarValue.value}`;
      closePopup(popupAvatar);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}