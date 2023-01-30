import {cardPopupOpen, closePopup} from './modal.js';
import {cardConteiner, photoLink, photoName, cardAdd, cardForm, initialCards} from './constants.js';
import { editButtonStatusDefault } from './utils.js';
import { getCards, submitPlaceForm, deletePlace, renderProfile, addLike, deleteLike} from './api.js';



//Добавление новой карточки
export function pasteCard (button) {
    submitPlaceForm(photoName, photoLink)
    .then((result) => {
        if(result) {
            const newCardElement = addCard(result.name,result.link, 0, result._id, false, true);
            cardConteiner.prepend(newCardElement);
            editButtonStatusDefault(button, 'Создать');
            closePopup(cardAdd);
            cardForm.reset();
            return;
        }
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  //Добавление карточки
  export function addCard (imageTitle, imageLink, likes, id, likeOwner, owner) {
    const cardTemplate = document.querySelector('#element_add').content; //шаблон карточки
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title'); //Заголовок карточки
    const cardImage = cardElement.querySelector('.element__image'); //Картинка в карточке
    const cardLike = cardElement.querySelector('.element__like-count');
    const cardLikeButton = cardElement.querySelector('.element__like-button');
    const cardDeleteButton = cardElement.querySelector('.element__delete-button');
    cardImage.id = id;
    if(!owner) cardDeleteButton.remove();
    cardDeleteButton.addEventListener('click', evt => {
        deletePlace(cardImage.id).then((result) => {
            if(result) evt.target.closest('.element').remove();
            
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    });
    cardLikeButton.addEventListener('click', evt => {
        if(cardLikeButton.classList.contains('element__like-button_active')) {
            deleteLike(cardImage.id).then((result) => {
                if(result) {
                    cardLikeButton.classList.remove('element__like-button_active');
                    cardLike.textContent = Number(cardLike.textContent) - 1;
                }
            })
            .catch((err) => {
              console.log(err); // выводим ошибку в консоль
            });
        }
        else {
            addLike(cardImage.id).then((result) => {
                if(result) {
                    cardLikeButton.classList.add('element__like-button_active');
                    cardLike.textContent = Number(cardLike.textContent) + 1;
                }
            })
            .catch((err) => {
              console.log(err); // выводим ошибку в консоль
            });
        }  
    });
    if(likeOwner) {
        cardLikeButton.classList.add('element__like-button_active');
    }
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
        renderProfile().then((result) => {
            if(result) {
                getCards().then(function (value) {
                value.forEach(item => {
                    const owner = item.owner._id === result._id;
                    let likeOwner = false;
                    item.likes.forEach(element => {
                        if(element._id == result._id) {
                            likeOwner = true;
                            return;
                        }
                    });
                    const newCard = addCard(item.name, item.link, item.likes.length, item._id, likeOwner, owner);
                    cardConteiner.append(newCard);
                });
            });
            }
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
        };