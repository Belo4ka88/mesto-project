
  //Переменные для рекатирования профиля
  export const popupAll = document.querySelectorAll('.popup');
  export const popupProfile = document.querySelector('.popup_profile-edit');
  export const profileForm = document.forms.editProfile;
  export const avatarForm = document.forms.editAvatar;
  //Переменные для добавления карточки
  export const editButton = document.querySelector('.profile__edit-button');
  export const placePopup = document.querySelector('.profile__add-button');
  export const addCardButton = document.querySelector('.popup__save-button')
  //Кнопка для добавления карточки
  export const cardAdd = document.querySelector('.popup_card-add');
  export const cardForm = document.forms.addCard;
  //Переменна, куда вставляется заготовка
  export const cardConteiner = document.querySelector('.element__list');
  //Переменная для попапа с изображением с карточки
  export const cardPopup = document.querySelector('.popup_card');
  //Изображение попапа с крточки
  export const cardImage = cardPopup.querySelector('.popup__image');
  //Переменная для описания карточки
  export const cardDescription = cardPopup.querySelector('.figure__image-caption');
  //Инпуты для добавления карточки
  export const nameInput = profileForm.elements.name;
  export const occupationInput = profileForm.elements.occupation;
  export const avatarValue = avatarForm.elements.name;
  
  //Поля инпут для редактирования профиля
  export const profileName = document.querySelector('.profile__name');
  export const occupationName = document.querySelector('.profile__description');
  
  
  //Для добавления карточек
  export const photoName = cardForm.elements.name;
  export const photoLink = cardForm.elements.link;

  //Смена аватара
  export const avatarEdit = document.querySelector('.profile__image');
  export const popupAvatar = document.querySelector('.popup__avatar');

  export function getResponse (res) {
      return res.ok ? res.json() : Promise.reject(res);
    }

export function editButtonStatusSave (button) {
        button.textContent = 'Сохранение...';
      }

 export function editButtonStatusDefault (button,text) {
        button.textContent = text;
      }