const popupAll = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile-edit');
//
const editButton = document.querySelector('.profile__edit-button');
const placePopup = document.querySelector('.profile__add-button');
//

function popupOpen (element) {
    element.classList.add('popup_opened');
}

function popupClose (element) {
    element.classList.remove('popup_opened');
}

function addCard() {
    console.log('ДОБАВЛЯЕШЬ КАРТОЧКИ');
}

function editProfile() {
    console.log('РЕДАКТИШЬ ПРОФИЛЬ');
}

popupAll.forEach( (popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close-button')) {
            popupClose(popup);
        }
    });
    popup.addEventListener('submit', (event) => {
        event.preventDefault();
        return event.target.closest('.popup_card-add') ? addCard() : editProfile();
    })
});


editButton.addEventListener('click', ()=> popupOpen(popupProfile));


  
  
