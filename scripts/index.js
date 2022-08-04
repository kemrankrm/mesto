//Exporting Data
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

//CONFIG DATA SETUP
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled', // NO NEED SINCE 'DISABLED' ATTRIBUTE USED
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    activeErrorClass: 'popup__input_type_error-active'
};

// Variable Setup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editFormPopup = document.querySelector('.popup_type_profile-edit');
const addFormPopup = document.querySelector('#popup-np');
const formElementClose = document.querySelector('#pup-close');
const newPlaceCloseButton = document.querySelector('#np-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const element = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButon = document.querySelector('#pi-close');
const bigImage = imagePopup.querySelector('.popup__image');
const citeImage = imagePopup.querySelector('.popup__cite');
const editOverlay = editFormPopup.querySelector('.popup__overlay');
const addOverlay = addFormPopup.querySelector('.popup__overlay');
const imageOverlay = imagePopup.querySelector('.popup__overlay');

//Forms Variables SetUp
const editFormElement = document.forms.editForm;
const addFormElement = document.forms.addForm;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.job;
const placeName = addFormElement.elements.placeName;
const placeImageUrl = addFormElement.elements.url;
const editSubmitButton = editFormElement.elements.button;
const addSubmitButton = addFormElement.elements.button;

//Validation Initializing
const validator = new FormValidator(config);
validator.enableValidation();

// Initial Cards Generation
initialCards.forEach(item => {
    const cardElement = new Card(item, '#element-template'); //TEMPLATE SELECTOR MUST BE MODIFIED!!!!!
    renderCard(cardElement.generateCard());
});

// Event Listeners
editButton.addEventListener('click', openForm);
addButton.addEventListener('click', () => openPopup(addFormPopup));
formElementClose.addEventListener('click', () => closePopup(editFormPopup));
editFormElement.addEventListener('submit', submitFormHandler);
newPlaceCloseButton.addEventListener('click', () => closePopup(addFormPopup));
addFormElement.addEventListener('submit', submitNewPlace);
imagePopupCloseButon.addEventListener('click', () => closePopup(imagePopup));
editOverlay.addEventListener('click', () => closePopup(editFormPopup));
addOverlay.addEventListener('click', () => closePopup(addFormPopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));

//Closing by Esc key Function
function closePopupEsc(evt){
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_open');
        closePopup(openedPopup);
    }
}

// Functions:
// Edit Form Open Function
function openForm(){
    const editInputs = [nameInput, jobInput];
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editFormPopup);
    validator._checkValidity(nameInput, editFormElement); //CHECKING THE VALIDITY ONES FORM IS OPEN
    validator._checkValidity(jobInput, editFormElement);  //CHECKING THE VALIDITY ONES FORM IS OPEN
    validator._toggleButtonState(validator._hasInvalidInputs(editInputs), editSubmitButton);
}

// Edit Form Submit Function
function submitFormHandler(evt){
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editFormPopup);
    evt.preventDefault();

}

// Place Card Submit Funciton
function submitNewPlace(evt){
    evt.preventDefault();
    const cardObject = {name: placeName.value, link: placeImageUrl.value};
    const cardElement = new Card(cardObject, '#element-template');
    renderCard(cardElement.generateCard());
    closePopup(addFormPopup);
    addFormElement.reset();
    validator._toggleButtonState(true, addSubmitButton); //RESET SUBMIT BUTTON STATE
}

// Place Card Open Function
export function openPlaceElement(title, link){
        bigImage.setAttribute('src', link);
        bigImage.setAttribute('alt', title);
        citeImage.textContent = title;
        openPopup(imagePopup);
}

// Popup Open Function
function openPopup(element){
    document.addEventListener('keydown', closePopupEsc)
    element.classList.add('popup_open');
}

// Popup Close Function
function closePopup(element){
    element.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupEsc);
}

// New Card Placing Function
function renderCard(cardData){
    element.prepend(cardData);
}