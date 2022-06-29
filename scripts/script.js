// Place Cards Array
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Variable Setup
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let formElement = document.querySelector('.popup');
let addFormElement = document.querySelector('#popup-np');
let formElementClose = document.querySelector('#pup-close');
let formSubmitButton = document.querySelector('.popup__submit-button');
let newPlaceSubmitButton = document.querySelector('#np-submit');
let newPlaceCloseButton = document.querySelector('#np-close');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let elements = document.querySelector('.elements');
let placeName = document.querySelector('.popup__input_type_place-name');
let placeImageUrl = document.querySelector('.popup__input_type_image-url');
let imagePopup = document.querySelector('.popup_type_image');
let imagePopupCloseButon = document.querySelector('#pi-close');
let bigImage = imagePopup.querySelector('.popup__image');
let citeImage = imagePopup.querySelector('.popup__cite');

// Place Cards creation from the initialCards Array
initialCards.forEach(item => {
    const elementTemplate = document.querySelector('#element-template').content;
    let placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    
    placeElement.querySelector('.elements__name').textContent = item.name;
    placeElement.querySelector('.elements__image').setAttribute('src', item.link);
    placeElement.querySelector('.elements__image').setAttribute('alt', item.name);

    elements.append(placeElement);
})

// Event Listeners
editButton.addEventListener('click', formOpen);
addButton.addEventListener('click', addFormOpen);
formElementClose.addEventListener('click', formClose);
formSubmitButton.addEventListener('click', formSubmitHandler);
newPlaceCloseButton.addEventListener('click', newPlaceFormClose);
newPlaceSubmitButton.addEventListener('click', newPlaceSubmit);
elements.addEventListener('click', placeElementRemove);
elements.addEventListener('click', placeElementLike);
elements.addEventListener('click', placeElementOpen);
imagePopupCloseButon.addEventListener('click', placeElementClose);



// Functions:
// Edit Form Open Function
function formOpen(){
    formElement.classList.add('popup_open');
    formElement.classList.remove('popup_close');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Place Card Add Form Open Funciton
function addFormOpen(){
    // addFormElement.classList.add('popup-new-place_open');
    console.log(addFormElement.classList.value);
    addFormElement.classList.add('popup_open');
    console.log(addFormElement.classList.value);
    addFormElement.classList.remove('popup_close');
    console.log(addFormElement.classList.value);
    
}

// Edit Form Close Function
function formClose(){
    formElement.classList.remove('popup_open');
    formElement.classList.add('popup_close');
    console.log(formElement.classList);
}

// Place Card Add Form Close Function
function newPlaceFormClose(){
    addFormElement.classList.remove('popup_open');
    addFormElement.classList.add('popup_close');
}

// Edit Form Submit Function
function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    formElement.classList.remove('popup_open');
}

// Place Card Submit Funciton
function newPlaceSubmit(evt){
    evt.preventDefault();
    addFormElement.classList.remove('popup_open');
    addFormElement.classList.add('popup_close');
    
    const elementTemplate = document.querySelector('#element-template').content;
    const placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    
    placeElement.querySelector('.elements__name').textContent = placeName.value;
    placeElement.querySelector('.elements__image').setAttribute('src', placeImageUrl.value);
    placeElement.querySelector('.elements__image').setAttribute('alt', placeName.value);
    elements.prepend(placeElement);

    placeName.value = 'Название';
    placeImageUrl.value = 'Ссылка на картинку';
}

// Place Card Delete Funciton
function placeElementRemove(evt){
    if(evt.target.classList.value === 'elements__remove-button'){
        evt.target.closest('.elements__element').remove();
    };
}

// Place Card Like Function
function placeElementLike(evt){
    if(evt.target.id === 'like-button'){
        evt.target.classList.toggle('elements__like-button_active');
    };
}

// Place Card Open Function
function placeElementOpen(evt){
    if(evt.target.classList.value === 'elements__image'){
        imagePopup.classList.add('popup_open');
        imagePopup.classList.remove('popup_close');
        bigImage.setAttribute('src', evt.target.getAttribute('src'));
        bigImage.setAttribute('alt', evt.target.getAttribute('alt'));
        citeImage.textContent = evt.target.getAttribute('alt');
        
    }
        
}

function placeElementClose(){
    let asd = imagePopup;
    imagePopup.classList.remove('popup_open');
    imagePopup.classList.add('popup_close');
    console.log(imagePopup === asd);
}