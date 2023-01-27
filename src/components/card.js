import {cardPopupOpen, closePopup} from './modal.js';
import {cardConteiner, photoLink, photoName, cardAdd, cardForm, editButtonStatusDefault, initialCards} from './utils.js';
import {enableValidation} from './validate.js';



  //Добавление новой карточки
export function pasteCard (button) {
    const newCardElement = addCard(photoName.value,photoLink.value, 0);
    cardConteiner.prepend(newCardElement);
    editButtonStatusDefault(button, 'Создать');
    closePopup(cardAdd);
    cardForm.reset();
    enableValidation();
  }

  //Добавление карточки
  export function addCard (imageTitle, imageLink, likes) {
    const cardTemplate = document.querySelector('#element_add').content; //шаблон карточки
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title'); //Заголовок карточки
    const cardImage = cardElement.querySelector('.element__image'); //Картинка в карточке
    const cardLike = cardElement.querySelector('.element__like-count');
    const cardLikeButton = cardElement.querySelector('.element__like-button');
    const cardDeleteButton = cardElement.querySelector('.element__delete-button');
    cardDeleteButton.addEventListener('click', evt => {
        evt.target.closest('.element').remove();
    });
    cardLikeButton.addEventListener('click', evt => {
        if(cardLikeButton.classList.contains('element__like-button_active')) {
            cardLikeButton.classList.remove('element__like-button_active');
            cardLike.textContent = Number(cardLike.textContent) - 1;
        }
        else {
            cardLikeButton.classList.add('element__like-button_active');
            cardLike.textContent = Number(cardLike.textContent) + 1;
        }  
    });
    cardTitle.textContent = imageTitle;
    cardImage.src = imageLink;
    cardImage.alt = imageTitle;
    //cardImage.scr.event.target
    cardImage.addEventListener('click', evt => cardPopupOpen(evt.target));
    cardLike.textContent = likes;
    //cardConteiner.append(cardElement);
    return cardElement;
  }

    //Вставка карточки из массива
    export function pasteItemes() {
        initialCards.forEach((item) => {
            const newCard = addCard(item.name, item.link, 0);
            cardConteiner.append(newCard);
        })
        };