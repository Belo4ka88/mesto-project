import '../index.css';

import {popupProfile, editButton, placePopup, cardAdd, nameInput, occupationInput, profileName, occupationName, avatarEdit, popupAvatar} from './utils.js';
import {enableValidation} from './validate.js';
import {pasteItemes} from './card.js';

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
  
  placePopup.addEventListener('click', ()=> openPopup(cardAdd));
  
  pasteItemes();
  enableValidation();
  