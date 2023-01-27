import './index.css';
import './utils';
import './validate.js';
import './card.js';
import './api.js';

import {initialCards, popupProfile, editButton, placePopup, cardAdd, nameInput, occupationInput, profileName, occupationName, avatarEdit, popupAvatar} from './utils.js';
import {enableValidation} from './validate.js';
import {pasteItemes} from './card.js';
import { renderProfile } from './api.js';

import {openPopup} from './modal.js';

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
  avatarEdit.style.backgroundImage = `url(${result.avatar}`;
  profileName.textContent = result.name;
  occupationName.textContent = result.about;
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
});
  
  placePopup.addEventListener('click', ()=> openPopup(cardAdd));
  
  pasteItemes();


  enableValidation();
  