// Массив с карточками
const initialCards = [
  {
    name: 'Столовая Гора',
    link: './images/Table-Mountain.jpg'
  },
  {
    name: 'Мыс Доброй Надежды',
    link: 'images/Cape-Hope.jpg'
  },
  {
    name: 'Пляж Пингвинов',
    link: 'images/Boulders.jpg'
  },
  {
    name: 'Лаки Потолс',
    link: 'images/Lucky-pothols.jpg'
  },
  {
    name: 'Парк Тситсикама',
    link: 'images/Tsitsikama.jpg'
  },
  {
    name: 'Водопад Лиссабон',
    link: 'images/Lisbon-falls.jpg'
  }
];
//Переменные для рекатирования профиля
const popupAll = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile-edit');
const profileForm = document.forms.editProfile;
//Переменные для добавления карточки
const editButton = document.querySelector('.profile__edit-button');
const placePopup = document.querySelector('.profile__add-button');
const addCardButton = document.querySelector('.popup__save-button')
//Кнопка для добавления карточки
const cardAdd = document.querySelector('.popup_card-add');
const cardForm = document.forms.addCard;
//Переменна, куда вставляется заготовка
const cardConteiner = document.querySelector('.element__list');
//Переменная для попапа с изображением с карточки
const cardPopup = document.querySelector('.popup_card');
//Изображение попапа с крточки
const cardImage = cardPopup.querySelector('.popup__image');
//Переменная для описания карточки
const cardDescription = cardPopup.querySelector('.figure__image-caption');
//Инпуты для добавления карточки
const nameInput = profileForm.elements.name;
const occupationInput = profileForm.elements.occupation;

//Поля инпут для редактирования профиля
const profileName = document.querySelector('.profile__name');
const occupationName = document.querySelector('.profile__description');


//Для добавления карточек
const photoName = cardForm.elements.name;
const photoLink = cardForm.elements.link;
//Добавление новой карточки
function pasteCard () {
  const newCardElement = addCard(photoName.value,photoLink.value);
  cardConteiner.prepend(newCardElement);  
  closePopup(cardAdd);
  cardForm.reset();
}


// Открывает Попап
function openPopup (element) {
    element.classList.add('popup_opened');
}
//Закрывает Попап
function closePopup (element) {
    element.classList.remove('popup_opened');
}
//Функция сохраняет данные профиля и закрывает попап
function editProfile() {
   profileName.textContent = nameInput.value;
   occupationName.textContent = occupationInput.value;
   closePopup(popupProfile);
}
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
    popup.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        closePopup(popup);
      }
    });
    popup.addEventListener('submit', (event) => {
        event.preventDefault();
        if(event.target.closest('.popup_card-add')) {
          return pasteCard();
        }
        return event.target.closest('.popup_card-add') ? pasteCard() : editProfile();
    })
});
//Кнопка редактирования профиля. Отображает инф-ю пользователя в попапе
editButton.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent;
  occupationInput.value = occupationName.textContent;
  openPopup(popupProfile);
});

placePopup.addEventListener('click', ()=> openPopup(cardAdd));

//Функция открыть/закрыть попап карточки

function cardPopupOpen (element) {
  cardImage.src = element.src;
  cardImage.alt = element.alt;
  cardDescription.textContent = element.alt;
  openPopup(cardPopup);
}

//Добавление карточки
function addCard (imageTitle, imageLink, ) {
  const cardTemplate = document.querySelector('#element_add').content; //шаблон карточки
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title'); //Заголовок карточки
  const cardImage = cardElement.querySelector('.element__image'); //Картинка в карточке
  cardElement.querySelector('.element__delete-button').addEventListener('click', evt => {
    evt.target.closest('.element').remove();    
  });
  cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active');    
  });
  cardTitle.textContent = imageTitle;
  cardImage.src = imageLink;
  cardImage.alt = imageTitle;
  //cardImage.scr.event.target
  cardImage.addEventListener('click', evt => cardPopupOpen(evt.target));
  //cardConteiner.append(cardElement);
  return cardElement;
}

//Вставка карточки из массива
function pasteItemes(data){
  data.forEach(function (item){
  const newCard = addCard(item.name, item.link);
  cardConteiner.append(newCard);
  });
  };

pasteItemes(initialCards);


//Функция, показывающая ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
  inputElement.classList.add('popup__input-field_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-message_visible');
};
//Функция, скрывающая ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}`);
  inputElement.classList.remove('popup__input-field_error');
  errorElement.classList.remove('popup__input-message_visible');
};
//Проверка на валидность
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else if (!checkNameField(inputElement.value) && inputElement.name === 'name') {
    showInputError(formElement, inputElement, 'Поля могут содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы');
  } else {
    inputElement.validity.valid = true;
    hideInputError(formElement, inputElement);
  }
};
//Проверка поля название
function checkNameField(name) {
  console.log(name);
  const nameField = /^[-а-яА-ЯёЁa-zA-z\s]+$/;
  return nameField.test(name);
}

//Проверяет валидность полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return inputElement.classList.contains('popup__input-field_error')
  });
};

//Функция включения/выключения кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove('popup__save-button_active');
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.add('popup__save-button_active');
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.removeAttribute('disabled');
  }
};


//Добавить слушатели
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
  });
});
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
enableValidation();
