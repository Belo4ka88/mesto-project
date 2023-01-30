import '../index.css';

import {settings, popupProfile, editButton, placePopup, cardAdd, nameInput, occupationInput, profileName, occupationName, avatarEdit, popupAvatar, popupAll} from './constants.js';
import {enableValidation} from './validate.js';
import {pasteItemes} from './card.js';
import { renderProfile } from './api.js';

import {openPopup, submitAction, closePopup} from './modal.js';

  avatarEdit.addEventListener('click', (evt) => {
      openPopup(popupAvatar);
   });

  //Кнопка редактирования профиля. Отображает инф-ю пользователя в попапе
  editButton.addEventListener('click', ()=> {
    nameInput.value = profileName.textContent;
    occupationInput.value = occupationName.textContent;
    openPopup(popupProfile);
  });

renderProfile().then((result) => {
  if(result) {
    avatarEdit.style.backgroundImage = `url(${result.avatar}`;
    profileName.textContent = result.name;
    occupationName.textContent = result.about;
  }
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//Перебор массива с карточками. Закрывает попап, вставляет карточку
popupAll.forEach( (popup) => {
  popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
      if (event.target.classList.contains('popup')) {
        closePopup(popup);
      }
  });
});
  
  placePopup.addEventListener('click', ()=> openPopup(cardAdd));

  document.addEventListener('submit', submitAction);

  pasteItemes();
  enableValidation(settings);
  