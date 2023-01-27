import {popupAll, avatarEdit, addCardButton, editButtonStatusSave, editButtonStatusDefault} from './utils.js';
import { popupAvatar, cardImage, cardDescription, cardPopup, nameInput, occupationInput, profileName, occupationName, popupProfile, avatarValue} from './utils.js';
import { pasteCard } from './card.js';
import {enableValidation} from './validate.js';

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
      document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
          closePopup(popup);
        }
      });
      popup.addEventListener('submit', (event) => {
          event.preventDefault();
          const button = event.target.querySelector('.popup__save-button');
          editButtonStatusSave(button);
          if(event.target.closest('.popup_card-add')) {
            return pasteCard(button);
          }
          return event.target.closest('.popup__avatar') ? editAvatar(button) : editProfile(button);
      })
  });
    //Функция открыть/закрыть попап карточки
  
    export function cardPopupOpen (element) {
        cardImage.src = element.src;
        cardImage.alt = element.alt;
        cardDescription.textContent = element.alt;
        openPopup(cardPopup);
      }
     // Открывает Попап
    export function openPopup (element) {
    element.classList.add('popup_opened');
    }
    //Закрывает Попап
    export function closePopup (element) {
    element.classList.remove('popup_opened');
    }
      //Функция сохраняет данные профиля и закрывает попап
    export function editProfile(button) {
      editButtonStatusDefault(button, 'Сохранить');
      profileName.textContent = nameInput.value;
      occupationName.textContent = occupationInput.value;
      closePopup(popupProfile);
      enableValidation();
 }


      //Функция обновления аватара
      export function editAvatar(button) {
        editButtonStatusDefault(button, 'Сохранить');
        avatarEdit.style.backgroundImage = `url(${avatarValue.value}`;
        closePopup(popupAvatar);
        enableValidation();
      }