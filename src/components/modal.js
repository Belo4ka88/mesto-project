import { editButtonStatusSave, editButtonStatusDefault } from './utils.js';
import { avatarEdit, avatarForm, popupAvatar, nameInput, occupationInput, profileName, occupationName, popupProfile, avatarValue, settings  } from './constants.js';
import { pasteCard } from './card.js';
import { submitProfileForm, changeAvatar } from './api.js';

export function submitAction(event) {
  event.preventDefault();
  const button = event.target.querySelector(settings.popupSaveButton);
  if(button) {
    editButtonStatusSave(button);
    if(event.target.closest('.popup_card-add')) {
      return pasteCard(button);
    }
    return event.target.closest('.popup__avatar') ? editAvatar(button) : editProfile(button);
  }
}
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
      //Функция сохраняет данные профиля и закрывает попап
    export function editProfile(button) {
      submitProfileForm(nameInput, occupationInput)
      .then((result) => {
        if(result) {
          editButtonStatusDefault(button, 'Сохранить');
          profileName.textContent = nameInput.value;
          occupationName.textContent = occupationInput.value;
          closePopup(popupProfile);
        }
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
 }


      //Функция обновления аватара
      export function editAvatar(button) {
        changeAvatar(avatarValue).then((result) => {
          if(result) {
            editButtonStatusDefault(button, 'Сохранить');
            avatarEdit.style.backgroundImage = `url(${avatarValue.value}`;
            closePopup(popupAvatar);
            avatarForm.reset();
          }
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
      }

      export function closeByEscape(evt) {
        if (evt.key === 'Escape') {
          const openedPopup = document.querySelector('.popup_opened');
          if(openedPopup) closePopup(openedPopup);
        }
      }