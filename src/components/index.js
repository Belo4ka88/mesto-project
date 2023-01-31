import '../index.css';

import { profileForm, avatarForm, cardForm, settings, popupProfile, editButton, placePopup, cardAdd, nameInput, occupationInput, profileName, occupationName, avatarEdit, popupAvatar, popupAll} from './constants.js';
import {enableValidation} from './validate.js';
import { pasteItemes,handleCardFormSubmit } from './card.js';
import { renderProfile, getCards } from './api.js';

import {openPopup, handleProfileFormSubmit, handleProfileAvatarFormSubmit, closePopup } from './modal.js';

export let userId;

  avatarEdit.addEventListener('click', (evt) => {
      openPopup(popupAvatar);
   });

  //Кнопка редактирования профиля. Отображает инф-ю пользователя в попапе
  editButton.addEventListener('click', ()=> {
    nameInput.value = profileName.textContent;
    occupationInput.value = occupationName.textContent;
    openPopup(popupProfile);
  });

  Promise.all([renderProfile(), getCards()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    avatarEdit.style.backgroundImage = `url(${userData.avatar}`;
    profileName.textContent = userData.name;
    occupationName.textContent = userData.about;
    userId = userData._id;
    pasteItemes(cards);
  })
  .catch(err => {
    console.log(err);
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

  profileForm.addEventListener('submit', handleProfileFormSubmit);
  avatarForm.addEventListener('submit', handleProfileAvatarFormSubmit);
  cardForm.addEventListener('submit', handleCardFormSubmit);

  
  enableValidation(settings);
  